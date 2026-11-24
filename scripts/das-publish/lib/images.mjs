// DAS Content Publishing Pipeline — image utilities (reusable, no dependencies).
//
// Search Atlas / Content Genius images are often JPEG bytes served with a
// .webp name and carry synthetic EXIF (fake camera models). normalizeImage()
// detects the real format, strips JPEG APP1 (EXIF/XMP) segments, and returns
// the pixel dimensions so <img> tags can carry width/height (no layout shift).
import fs from "node:fs";
import path from "node:path";

export function detectFormat(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpg";
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.slice(0, 4).toString("ascii") === "RIFF" && buf.slice(8, 12).toString("ascii") === "WEBP") return "webp";
  return null;
}

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    // SOF0..SOF15 except DHT(C4), JPG(C8), DAC(CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

function webpSize(buf) {
  const chunk = buf.slice(12, 16).toString("ascii");
  if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const b = buf.readUInt32LE(21);
    return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
  }
  return null;
}

export function imageSize(buf) {
  const f = detectFormat(buf);
  if (f === "jpg") return jpegSize(buf);
  if (f === "png") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (f === "webp") return webpSize(buf);
  return null;
}

/** Remove APP1 (EXIF/XMP) segments from a JPEG; other formats returned unchanged. */
export function stripJpegMetadata(buf) {
  if (detectFormat(buf) !== "jpg") return buf;
  const out = [buf.slice(0, 2)];
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    if (marker === 0xda) { out.push(buf.slice(i)); return Buffer.concat(out); } // start of scan: rest is image data
    const len = buf.readUInt16BE(i + 2);
    if (marker !== 0xe1) out.push(buf.slice(i, i + 2 + len));
    i += 2 + len;
  }
  return Buffer.concat(out);
}

/**
 * Normalize an image file in place: strip metadata, fix the extension to match
 * the real format. Returns { file, width, height, format }. Idempotent.
 */
export function normalizeImage(file) {
  const raw = fs.readFileSync(file);
  const format = detectFormat(raw);
  if (!format) throw new Error(`Unrecognized image format: ${file}`);
  const clean = stripJpegMetadata(raw);
  const size = imageSize(clean);
  if (!size) throw new Error(`Could not read image dimensions: ${file}`);
  const ext = path.extname(file);
  const target = ext.slice(1).toLowerCase() === format || (format === "jpg" && ext.toLowerCase() === ".jpeg")
    ? file
    : file.slice(0, file.length - ext.length) + "." + format;
  fs.writeFileSync(target, clean);
  if (target !== file) fs.unlinkSync(file);
  return { file: target, format, ...size };
}

export function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

export function normalize(out, v) {
    const x = v[0];
    const y = v[1];
    const z = v[2];
    const d = Math.sqrt(x * x + y * y + z * z);
    out[0] = x / d;
    out[1] = y / d;
    out[2] = z / d;
    return out;
}

export function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;
    return out;
}

export function mul(out, v1, v2) {
    out[0] = v1[0] * v2[0];
    out[1] = v1[1] * v2[1];
    out[2] = v1[2] * v2[2];
    return out;
}

export function scaleAndAdd(out, v1, v2, s) {
    out[0] = v1[0] + v2[0] * s;
    out[1] = v1[1] + v2[1] * s;
    out[2] = v1[2] + v2[2] * s;
    return out;
}

export function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    out[2] = v1[2] + v2[2];
    return out;
}

export function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    out[2] = v1[2] - v2[2];
    return out;
}

const rel = [];
// start and end must be normalized
export function slerp(out, start, end, t) {
    // https://keithmaggio.wordpress.com/2011/02/15/math-magician-lerp-slerp-and-nlerp/
    const cosT = dot(start, end);
    const theta = Math.acos(cosT) * t;

    scaleAndAdd(rel, end, start, -cosT);
    normalize(rel, rel);

    scale(out, start, Math.cos(theta));
    scaleAndAdd(out, out, rel, Math.sin(theta));

    return out;
}

export function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4, out, writeOffset) {
    const dx1 = x2 - x1;
    const dx2 = x4 - x3;
    const dy1 = y2 - y1;
    const dy2 = y4 - y3;

    const cross = dy2 * dx1 - dx2 * dy1;
    const tmp1 = y1 - y3;
    const tmp2 = x1 - x3;
    const t1 = (dx2 * tmp1 - dy2 * tmp2) / cross;
    // const t2 = (dx1 * tmp1 - dy1 * tmp2) / cross;

    out[writeOffset] = x1 + t1 * (x2 - x1);
    out[writeOffset + 1] = y1 + t1 * (y2 - y1);

    return t1;
}
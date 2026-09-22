/** A damped, reflective 2-D shallow-water height field. */
export class WaterSimulation {
  readonly width: number;
  readonly height: number;
  readonly surface: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly image: ImageData;
  private readonly heightField: Float32Array;
  private readonly velocity: Float32Array;
  private readonly walls: Uint8Array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.surface = document.createElement('canvas');
    this.surface.width = width;
    this.surface.height = height;
    const context = this.surface.getContext('2d', { alpha: false });
    if (!context) throw new Error('Canvas 2D is unavailable');
    this.context = context;
    this.image = context.createImageData(width, height);
    this.heightField = new Float32Array(width * height);
    this.velocity = new Float32Array(width * height);
    this.walls = new Uint8Array(width * height);
    this.drop(0.5, 0.48, 0.06, 2.8);
  }

  clear() {
    this.heightField.fill(0);
    this.velocity.fill(0);
    this.walls.fill(0);
  }

  drop(x: number, y: number, radius: number, force = 1) {
    const cx = x * this.width;
    const cy = y * this.height;
    const r = Math.max(2, radius * Math.min(this.width, this.height));
    const limit = Math.ceil(r * 2.2);
    for (let py = Math.max(1, Math.floor(cy - limit)); py < Math.min(this.height - 1, Math.ceil(cy + limit)); py++) {
      for (let px = Math.max(1, Math.floor(cx - limit)); px < Math.min(this.width - 1, Math.ceil(cx + limit)); px++) {
        const index = py * this.width + px;
        if (this.walls[index]) continue;
        const distance = ((px - cx) ** 2 + (py - cy) ** 2) / (r * r);
        if (distance < 4.84) this.velocity[index] -= Math.exp(-distance * 2.8) * force;
      }
    }
  }

  paintWall(x: number, y: number, radius: number, value: boolean) {
    const cx = x * this.width;
    const cy = y * this.height;
    const r = Math.max(2, radius * Math.min(this.width, this.height));
    for (let py = Math.max(1, Math.floor(cy - r)); py < Math.min(this.height - 1, Math.ceil(cy + r)); py++) {
      for (let px = Math.max(1, Math.floor(cx - r)); px < Math.min(this.width - 1, Math.ceil(cx + r)); px++) {
        if ((px - cx) ** 2 + (py - cy) ** 2 > r * r) continue;
        const index = py * this.width + px;
        this.walls[index] = value ? 1 : 0;
        this.heightField[index] = 0;
        this.velocity[index] = 0;
      }
    }
  }

  step(speed: number, damping: number) {
    const w = this.width;
    const h = this.height;
    const field = this.heightField;
    const velocity = this.velocity;
    const walls = this.walls;
    // The chosen coefficient remains below the 2-D wave equation stability limit.
    const coefficient = 0.08 + speed * 0.31;
    const retention = 0.9985 - damping * 0.014;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (walls[i]) continue;
        const center = field[i];
        const left = walls[i - 1] ? center : field[i - 1];
        const right = walls[i + 1] ? center : field[i + 1];
        const top = walls[i - w] ? center : field[i - w];
        const bottom = walls[i + w] ? center : field[i + w];
        velocity[i] = (velocity[i] + (left + right + top + bottom - 4 * center) * coefficient) * retention;
      }
    }
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (!walls[i]) field[i] = Math.max(-6, Math.min(6, field[i] + velocity[i]));
      }
    }
    // A low-energy absorbing rim prevents waves from bouncing forever.
    for (let x = 0; x < w; x++) {
      velocity[x] *= 0.6;
      velocity[(h - 1) * w + x] *= 0.6;
    }
    for (let y = 0; y < h; y++) {
      velocity[y * w] *= 0.6;
      velocity[y * w + w - 1] *= 0.6;
    }
  }

  render(time: number) {
    const { width: w, height: h } = this;
    const pixels = this.image.data;
    const field = this.heightField;
    const walls = this.walls;
    const lightX = -0.45;
    const lightY = -0.6;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const p = i * 4;
        if (walls[i]) {
          const edge = !walls[i - 1] || !walls[i + 1] || !walls[i - w] || !walls[i + w];
          pixels[p] = edge ? 165 : 32;
          pixels[p + 1] = edge ? 204 : 70;
          pixels[p + 2] = edge ? 211 : 87;
          pixels[p + 3] = 255;
          continue;
        }

        const left = field[i - 1] ?? field[i];
        const right = field[i + 1] ?? field[i];
        const top = field[i - w] ?? field[i];
        const bottom = field[i + w] ?? field[i];
        const currentA = x * 0.074 + y * 0.021 + time * 0.00032;
        const currentB = y * 0.097 - x * 0.034 - time * 0.00042;
        const ambientX = Math.sin(currentA + Math.sin(currentB) * 1.1) * 0.17 + Math.sin(x * 0.14 + y * 0.043 - time * 0.00052) * 0.07;
        const ambientY = Math.cos(currentB + Math.sin(currentA) * 0.8) * 0.16 + Math.cos(y * 0.13 - x * 0.06 + time * 0.00039) * 0.06;
        const nx = (left - right) * 8 + ambientX;
        const ny = (top - bottom) * 8 + ambientY;
        const slope = Math.hypot(nx, ny);
        const diffuse = nx * lightX + ny * lightY;
        const reflection = Math.pow(Math.max(0, 1 - Math.hypot(nx + 0.25, ny + 0.28) * 1.72), 6) * 96;
        const glint = Math.pow(Math.max(0, 1 - Math.hypot(nx - 0.18, ny - 0.2) * 1.85), 8) * 40;
        const caustic = Math.pow(Math.max(0, Math.sin(currentA * 1.5 + Math.sin(currentB)) * Math.sin(currentB * 1.6 + Math.sin(currentA))), 3) * 23;
        const depth = y / h;
        const shade = Math.max(-48, Math.min(58, diffuse * 78 + field[i] * 38));
        const foam = Math.max(0, slope - 0.4) * 23;
        const shimmer = reflection + glint + foam;
        pixels[p] = Math.max(0, Math.min(255, 9 + depth * 10 + shade * 0.54 + caustic + shimmer * 0.76));
        pixels[p + 1] = Math.max(0, Math.min(255, 79 + depth * 31 + shade + caustic * 1.5 + shimmer));
        pixels[p + 2] = Math.max(0, Math.min(255, 108 + depth * 38 + shade * 1.05 + caustic * 1.8 + shimmer * 0.9));
        pixels[p + 3] = 255;
      }
    }
    this.context.putImageData(this.image, 0, 0);
  }
}

/**
 * Transforms seconds into a desired string format
 * e.g.
 *
 * 10 seconds -> "00:10"
 * 123 seconds -> "02:03"
 */
export class ResultFormatter {
  public parseSeconds(time: number): string {
    const minutes = Math.trunc(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  }
}

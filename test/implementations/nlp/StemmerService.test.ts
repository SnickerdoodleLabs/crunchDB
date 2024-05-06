import { ELanguageCode } from "crunchDB/objects";

import { StemmerService } from "crunchDB/implementations";
import { IStemmerService } from "crunchDB/interfaces";
import { englishText } from "test/mocks/nlp";

class Mocks {
  public factory(): IStemmerService {
    return new StemmerService();
  }
}
describe("StemmerService", () => {
  it("english stop words", async () => {
    // Arange
    const mocks = new Mocks();
    const service = mocks.factory();

    // Act
    const result = await service.tokenize(ELanguageCode.English, englishText);

    // Assert
    expect(result.isOk()).toBeTruthy();
    const tokens = result._unsafeUnwrap();
    // console.log(tokens);
    expect(tokens.includes("the")).toBeFalsy();
    expect(tokens.includes("a")).toBeFalsy();
    expect(tokens.includes("an")).toBeFalsy();
    expect(tokens.includes("and")).toBeFalsy();
    expect(tokens.includes("or")).toBeFalsy();
    expect(tokens.includes("it")).toBeFalsy();
    expect(tokens.includes(",")).toBeFalsy();
    expect(tokens.includes(";")).toBeFalsy();
    expect(tokens.includes("[")).toBeFalsy();
    expect(tokens.includes("]")).toBeFalsy();
  });

  it("I am running -> ['run']", async () => {
    // Arange
    const mocks = new Mocks();
    const service = mocks.factory();
    const text = "I am running";
    const expected = ["run"];

    // Act
    const result = await service.tokenize(ELanguageCode.English, text);

    // Assert
    expect(result.isOk()).toBeTruthy();
    const tokens = result._unsafeUnwrap();
    console.log("tokens", tokens);
    expect(tokens).toEqual(expected);
  });
});

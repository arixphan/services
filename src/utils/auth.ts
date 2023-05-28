import * as bcrypt from "bcrypt";

const saltOrRounds = 18;

export const hashString = async (text: string): Promise<string> => {
  return await bcrypt.hash(text, saltOrRounds);
};

export const compareHash = async (
  text: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(text, hash);
};

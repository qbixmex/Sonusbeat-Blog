"use server";

import { signIn } from "@/auth.config";

export const handleLoginGithub = async () => {
  await signIn("github");
};

export default handleLoginGithub;

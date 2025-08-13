/** @format */

import { rquireAdmin } from "@/lib/auth-guard";

const UsersPage = async () => {
  await rquireAdmin();

  return <>UsersPage</>;
};

export default UsersPage;

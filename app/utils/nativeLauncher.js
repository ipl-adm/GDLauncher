import path from 'path';
import fsa from 'fs-extra';
import os from 'os';

export default async function OfficialLancherProfilesExists() {
  const homedir = process.env.APPDATA || os.homedir();
  const vanillaMCPath = path.join(homedir, '.minecraft');
  if (await fsa.pathExists(vanillaMCPath)) {
    try {
      const vnlJson = await fsa.readJson(path.join(vanillaMCPath, 'launcher_profiles.json'));
      if (vnlJson.authenticationDatabase && vnlJson.selectedUser && vnlJson.clientToken) {
        return true;
      }
    } catch (err) { console.log(err); }
  }
  return false;
}
import { execSync } from "child_process";
import createLogger from "./logger.mjs";

const log = createLogger("import-and-commit");
const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

execSync("git checkout main", { stdio: "inherit" });
execSync("npm run obsidian:import", { stdio: "inherit" });

const status = execSync("git status --porcelain src/content/blog", { encoding: "utf-8" });
if (status.trim()) {
  execSync("git add src/content/blog", { stdio: "inherit" });
  try {
    execSync(`git commit -m "write:(blog) ${timestamp}"`, { stdio: "inherit" });
    log.success(`Committed changes: write:(blog) ${timestamp}`);
  } catch (e) {
    log.warn("No changes staged for commit");
  }
} else {
  log.info("No changes to commit");
}

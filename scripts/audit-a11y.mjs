import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "..", "public", "audits");
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const pages = [
  { path: "/audit/lms", name: "lms" },
  { path: "/audit/whatsapp", name: "whatsapp" },
];

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function runAudit(pagePath, pageName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}${pagePath}`, { waitUntil: "networkidle" });
    console.log(`\n=== Auditing: ${pagePath} (${pageName}) ===`);

    const results = await new AxeBuilder({ page }).analyze();

    const { violations, passes, incomplete } = results;

    // Save full results as JSON
    const jsonPath = resolve(outputDir, `${pageName}-results.json`);
    writeFileSync(jsonPath, JSON.stringify(results, null, 2));
    console.log(`Results saved: ${jsonPath}`);

    // Take screenshot
    const screenshotPath = resolve(outputDir, `${pageName}-screenshot.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);

    // Summary
    console.log(`Violations: ${violations.length}`);
    console.log(`Passes: ${passes.length}`);
    console.log(`Incomplete: ${incomplete.length}`);

    // Take element-specific screenshots for violations
    for (const violation of violations) {
      for (const node of violation.nodes) {
        const selector = node.target.join(" ");
        try {
          const el = await page.locator(selector).first();
          if (el) {
            const elScreenshotPath = resolve(
              outputDir,
              `${pageName}-violation-${violation.id}-${violation.nodes.indexOf(node)}.png`
            );
            await el.screenshot({ path: elScreenshotPath });
            console.log(`Violation element screenshot: ${elScreenshotPath}`);
          }
        } catch {
          console.log(`Could not capture element: ${selector}`);
        }
      }
    }

    return { violations: violations.length, passes: passes.length, incomplete: incomplete.length };
  } catch (err) {
    console.error(`Error auditing ${pagePath}:`, err.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log(`Axe-core audit starting...\nBase URL: ${baseUrl}`);
  console.log(`Output: ${outputDir}\n`);

  let totalViolations = 0;
  let totalPasses = 0;

  for (const { path, name } of pages) {
    const result = await runAudit(path, name);
    if (result) {
      totalViolations += result.violations;
      totalPasses += result.passes;
    }
  }

  console.log(`\n=== Audit Complete ===`);
  console.log(`Total violations: ${totalViolations}`);
  console.log(`Total passes: ${totalPasses}`);
}

main();

import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

// Fetch the HTML using Puppeteer
export async function fetchWithPuppeteer(url: string): Promise<string | null> {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h1'); // Ensure page content is loaded
    const html = await page.content();
    await browser.close();
    return html;
  } catch (error) {
    console.error('Puppeteer error:', error);
    return null;
  }
}

// Clean up the title by removing specific phrases
function cleanTitle(rawTitle: string): string {
  return rawTitle
    .replace(/Big page update|major|minor|Handful of small changes/gi, '')
    .trim();
}

// Extract the relevant data from the HTML
export function extractData(html: string): Record<string, any> {
  const $ = cheerio.load(html);

  const rawTitle = $('h1').text().trim();
  const title = cleanTitle(rawTitle);

  const summary =
    $("meta[name='description']").attr('content') ||
    $('.hero-description').text().trim() ||
    'No summary available.';

  const sections: Record<string, string> = {};
  $('.category-section, section').each((_, section) => {
    let sectionTitle = $(section).find('h2').text().trim();
    let sectionContent = $(section)
      .find('p, ul li')
      .map((_, el) => $(el).text().trim())
      .get()
      .join(' ');

    if (sectionTitle.includes('Research Feed') || !sectionContent) {
      return;
    }

    if (!sectionTitle && sectionContent) {
      sectionTitle = `Section ${Object.keys(sections).length + 1}`;
    }

    if (sectionTitle && sectionContent) {
      sections[sectionTitle] = sectionContent;
    }
  });

  return { title, summary, sections };
}

// Fetch dynamic data based on the user's query
export async function fetchDynamicData(
  query: string,
  type: string = 'supplements' // Default type is 'supplements', but can be changed
): Promise<Record<string, any> | null> {
  try {
    const url = `https://examine.com/${type}/${encodeURIComponent(query)}`;
    const html = await fetchWithPuppeteer(url);

    if (!html) {
      return null;
    }

    return extractData(html);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

import { browser } from '@wdio/globals';

describe('Simple Web Test', () => {
    before(async () => {
        await browser.url('http://localhost:8080/index.html');
    });

    it('should verify the page title', async () => {
        const title = await browser.getTitle();
        expect(title).toBe("UI5 Application: crudproject");
    });
});

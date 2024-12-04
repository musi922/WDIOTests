import { expect } from 'chai';
import { browser, $ } from '@wdio/globals';

describe('UI5 Product Navigation', () => {
    it('should open application and verify title', async () => {
        await browser.maximizeWindow();
        await browser.url('http://localhost:8080/index.html');

        await browser.waitUntil(async () => {
            const title = await browser.getTitle();
            return title === "UI5 Application: crudproject";
        }, {
            timeout: 5000,
            timeoutMsg: 'Page title did not match expected'
        });
    });

    it('should click on first product row', async () => {
        const firstProductRow = await $('tr.elements');
        
        await firstProductRow.waitForClickable({
            timeout: 10000,  
            timeoutMsg: 'Product row not clickable'
        });
        
        await firstProductRow.click();

        await browser.pause(2000);  
    });
    it('should find and click back button', async () => {
        // Multiple selector strategies
        const backButtonSelectors = [
            '.sapMPageNavButtonText[data-sap-ui="backBtn"]', 
            '.sapMPageNavButton', 
            '.sapMBarChild', 
            'button[title="Back"]', 
            '//button[contains(@aria-label, "Navigate back")]'
        ];

        let backButton;
        for (const selector of backButtonSelectors) {
            try {
                backButton = await $(selector);
                await backButton.waitForClickable({
                    timeout: 10000,
                    timeoutMsg: `Back button not found with selector: ${selector}`
                });
                await backButton.click();
                break;
            } catch (error) {
                console.log(`Trying selector: ${selector}`);
            }
        }

        if (!backButton) {
            throw new Error('Could not find back button');
        }

        await browser.pause(2000);
    });
});
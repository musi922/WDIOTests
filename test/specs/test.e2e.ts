import { browser } from '@wdio/globals'

describe('Simple Web Test', () => {
    it('should navigate and click button', async () => {
        await browser.url('http://localhost:8080/index.html')

        const button = await $('button')
        await button.click();
        const category = await $('#categoryId'); 
        await category.waitForDisplayed({ timeout: 5000 });


        
    })
})

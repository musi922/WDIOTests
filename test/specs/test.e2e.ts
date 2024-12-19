import { browser, $ } from '@wdio/globals';
import { expect } from '@wdio/globals';

interface TestProduct {
    id: string;
    name: string;
    description: string;
    price: string;
}

describe('Login Form Tests', () => {
    it('should login successfully with valid credentials', async () => {
        await browser.url('http://localhost:8080/index.html');

        const usernameField = await $('input[name="email"]');
        console.log('Entering username...');
        await usernameField.waitForExist({ timeout: 10000 });
        await usernameField.waitForDisplayed({ timeout: 10000 });
        await usernameField.setValue('admin');
        console.log('Username entered.');

        const passwordField = await $('input[name="password"]');
        await passwordField.waitForExist({ timeout: 10000 });
        await passwordField.waitForDisplayed({ timeout: 10000 });
        await passwordField.setValue('admin123');

        const signInButton = await $('button=Sign in');
        await signInButton.waitForDisplayed({ timeout: 10000 });
        await signInButton.click();

        const mainContent = await $('.mainTabBar');
        await mainContent.waitForDisplayed({ timeout: 10000 });

        await expect(mainContent).toBeExisting();
        await browser.pause(3000)
    });
});
describe('Product Management', () => {
    it('should create, edit, and delete a product', async () => {

        const productsTable = await $('.idTable');
        await productsTable.waitForDisplayed({ timeout: 30000 });

        const createButton = await $('button=Create Product');
        await createButton.click();

        const createDialog = await $('.createProduct');
        await createDialog.waitForDisplayed({ timeout: 5000 });
        await browser.pause(3000)

        const testProduct: TestProduct = {
            id: '1',
            name: 'Automated Test Product',
            description: 'Created by automated test',
            price: `199`,
        };

        await $('input[name="ID"]').setValue(testProduct.id);
        await $('input[name="Name"]').setValue(testProduct.name);
        await $('input[name="Description"]').setValue(testProduct.description);
        await $('input[name="Price"]').setValue(testProduct.price);

        await $('button=Create').click();
 
        
        const okButton = await $('button=OK');
        await okButton.waitForDisplayed({timeout: 20000})
        await okButton.click();

        await browser.pause(5000)



        const productRow = await $(`//*[contains(@class, "idTable")]//*[contains(@class, "id") and text()="${testProduct.id}"]/ancestor::tr`);
        await productRow.waitForDisplayed({ timeout: 10000 });
        
        const editButton = await productRow.$('button=Edit');
        await editButton.click();        
        await browser.pause(3000)

        const updatedName = `Updated ${testProduct.name}`;
        await $('input[name="Name"]').setValue(updatedName);
        const updatedDescription = `Updated ${testProduct.description}`;
        await $('input[name="Description"]').setValue(updatedDescription);
        const updatedPrice = `2${testProduct.price}`;
        await $('input[name="Price"]').setValue(updatedPrice);
        await browser.pause(5000)
        await $('button=Create').click();


        const okBu = await $('button=OK');
        await okBu.waitForDisplayed({timeout: 20000})
        await okBu.click();
        await browser.pause(5000)

        const productsRow = await $(`//*[contains(@class, "idTable")]//*[contains(@class, "id") and text()="${testProduct.id}"]/ancestor::tr`);
        await productsRow.waitForDisplayed({timeout: 5000})

        await browser.pause(5000)

        const deleteButton = await productsRow.$('button=Delete')
        await deleteButton.click()
        await browser.pause(5000)

        const confirmationButton = await $('button=Yes')
        await confirmationButton.click()
        await browser.pause(1000)

        const ok = await $('button=OK');
        await ok.waitForDisplayed({timeout: 20000})
        await ok.click();
        await browser.pause(5000)




    });
});


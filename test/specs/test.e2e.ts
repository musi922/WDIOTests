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

        const testProduct: TestProduct = {
            id: '69',
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



        const editButton = await $(`//*[contains(text(),'${testProduct.id}')]/ancestor::tr//button[contains(text(),'Edit')]`);
        await editButton.click();
        await browser.pause(1000);

        const updatedName = `Updated ${testProduct.name}`;
        await $('#productNameInput').setValue(updatedName);
        await $('button=Save').click();
        await browser.pause(1000);

        const updatedRow = await $(`//*[contains(text(),'${updatedName}')]`);
        const isUpdated = await updatedRow.isExisting();
        expect(isUpdated).toBe(true);

        const deleteButton = await $(`//*[contains(text(),'${updatedName}')]/ancestor::tr//button[contains(text(),'Delete')]`);
        await deleteButton.click();
        await browser.pause(1000);

        const isDeleted = await updatedRow.isExisting();
        expect(isDeleted).toBe(false);
    });
});


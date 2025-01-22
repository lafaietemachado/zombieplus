// @ts-check
const { test, expect } = require('@playwright/test');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Usando Xpath para buscar o elemento
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  // Usando tag do HTML com o texto representando o texto
  //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()

  // Usando as / ao invé de ' ele usa a função de contains
  await page.getByRole('button', { name: /Aperte o play/ }).click()

  //validando se após o click aparece o modal de preenchimento, usando o getByTestId pois tem data-testid="modal", o heading serve
  //para pegar elentos em todos os H1, h2, etc e depois valido pelo texto Fila de espera
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Seu nome completo').fill('Lafaiete Machado')
  await page.getByPlaceholder('Seu email principal').fill('lafaiete.machado@gmail.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({timeout: 5000})
});
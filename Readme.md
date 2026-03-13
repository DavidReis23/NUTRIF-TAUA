# NUTRIF-TAUÁ - Sistema de Gerenciamento de Refeitório

O **NUTRIF-TAUÁ** é uma aplicação web desenvolvida para auxiliar no gerenciamento de refeitórios escolares. O sistema permite o controle de cardápios semanais, gerenciamento de alunos (com status de ativo/bloqueado) e visualização de dados através de um dashboard interativo para nutricionistas e gestores.

-----

## 🚀 Tecnologias Utilizadas

O projeto está sendo construído utilizando tecnologias web padrão, sem a necessidade no momento de frameworks pesados, garantindo leveza e rapidez.

  * **HTML5:** Estruturação semântica das páginas.
  * **CSS3:** Estilização responsiva, uso de Flexbox e Grid Layout, Variáveis CSS (`:root`) para consistência de cores (Tema Verde/Branco).
  * **JavaScript (ES6+):** Lógica de interação e manipulação do DOM.
  * **Phosphor Icons:** Biblioteca de ícones utilizada para a interface visual.
  * **Google Fonts:** Fonte *Poppins* utilizada em todo o projeto.

-----

## 💻 Como Rodar o Projeto

### No Computador (Recomendado)

A melhor forma de rodar é utilizando o **VS Code** com a extensão **Live Server**.

1.  **Pré-requisitos:** Tenha o [VS Code](https://code.visualstudio.com/) instalado.
2.  **Abra o projeto:** Abra a pasta `NUTRIF-TAUÁ` no VS Code.
3.  **Instale a Extensão:** Na aba de extensões do VS Code, procure por "Live Server" e instale.
4.  **Rodando:**
      * Vá até a pasta `pages/pages-Login` (ou a página que deseja iniciar, como `dashNutri.html`).
      * Clique com o botão direito no arquivo HTML.
      * Selecione **"Open with Live Server"**.
      * O navegador abrirá automaticamente com o site rodando.

### No Celular (Via Rede Local)

Para testar no celular, tanto o computador quanto o celular devem estar conectados na **mesma rede Wi-Fi**.

1.  Siga os passos acima para rodar o projeto no computador com o **Live Server**.
2.  Descubra o **IP Local** do seu computador:
      * *Windows:* Abra o terminal, digite `ipconfig` e procure por "Endereço IPv4" (Ex: `192.168.0.15` ou `192.168.1.5`).
3.  No navegador do seu celular, digite o IP do computador seguido da porta do Live Server (geralmente `5500`) e o caminho da pasta.
      * Exemplo: `http://192.168.0.15:5500/pages/pages-Nutri/dashNutri.html`

-----

## 📖 Entendendo os Códigos

### 1\. HTML (Estrutura)

Os arquivos `.html` definem o esqueleto das páginas. Usamos tags semânticas como `<header>`, `<aside>` (barra lateral), `<main>` (conteúdo principal) para garantir organização e acessibilidade.

### 2\. CSS (Estilo)

Os arquivos `.css` são responsáveis pela beleza do site.

  * **Global:** Definimos variáveis de cores no `:root` (ex: `--primary-green`) para que, se precisarmos mudar o tom de verde do site, mudamos em um só lugar.
  * **Classes Utilitárias:** Usamos classes como `.icon-circle`, `.btn-save`, `.sidebar` que são reutilizadas em várias páginas para manter o padrão visual.

### 3. JavaScript (Comportamento e Persistência)

Os scripts foram desenvolvidos para garantir a interatividade e simular o funcionamento completo do sistema:

* **Manipulação do DOM:** O JS captura eventos e interage com o HTML para validação de formulários e feedback visual.
* **Simulação de Banco de Dados (LocalStorage):**
    * Para fins de prototipagem e funcionamento imediato do Front-End (sem dependência de Back-End neste momento), utilizamos o `localStorage` do navegador.
    * **CRUD:** O sistema é capaz de Criar, Ler e Excluir registros (Alunos e Cardápios), mantendo os dados salvos no navegador do usuário mesmo após recarregar a página.
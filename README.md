# 🚘 TrustWay

A nova era da proteção veicular tecnológica.

O **TrustWay** é uma solução criada para elevar o padrão da proteção veicular, unindo robustez operacional a uma interface simplificada. A plataforma elimina as barreiras de entrada do mercado tradicional, entregando uma cobertura versátil e uma infraestrutura de suporte 24h que garante assistência imediata em qualquer imprevisto na estrada.

Nosso objetivo é democratizar o acesso à segurança automotiva, por meio de uma jornada digital transparente, acessível e livre de papelada.

---

# 📌 Sobre o projeto

O **TrustWay** foi criado pela **TwoStack**, uma empresa de desenvolvimento de software focada na criação de soluções digitais eficientes, modernas e escaláveis.

Este projeto representa a base de um sistema de **gestão de seguros para veículos**, que poderá evoluir com novas funcionalidades ao longo do tempo.

---

# 🗄️ Estrutura do Banco de Dados

O sistema é composto por três tabelas principais:

### 👤 Usuário
Armazena as informações de clientes e administradores.

### 📄 Apólice
Registra os dados do seguro contratado pelo cliente.

### 🏍️ Veículo
Guarda as informações do veículo segurado.

---

# ⚙️ Funcionalidades atuais

Atualmente, o sistema permite:

## 👤 Usuário
- Cadastrar novos usuários 
- Atualizar informações dos usuários  
- Remover usuários   
- Buscar todos os usuários  
- Buscar usuário por CPF
- Buscar usuário por nome
- Buscar usuário por e-mail

## 📄 Apólice
- Criar nova apólice  
- Atualizar apólice  
- Remover apólice  
- Buscar todas as apólices  
- Buscar apólice por ID
- Buscar apólices por CPF do usuário

## 🏍️ Veículo
- Cadastrar veículos
- Atualizar dados do veículo 
- Remover veículos 
- Buscar todos os veículos 
- Buscar veículo por placa
- Buscar veículo por modelo

---

# 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

### Backend
- **TypeScript**
- **Node.js**
- **NestJS**

### Banco de Dados
- **MySQL (ambiente de desenvolvimento)**
- **PostgreSQL (ambiente de produção - Render)**

---

# 🌐 Deploy e Infraestrutura 

A aplicação está disponível em ambiente de produção utilizando o Render, garantindo escalabilidade e disponibilidade: https://trustway.onrender.com/swagger

---

# 🛡️ Segurança

O TrustWay foi construído seguindo  boas práticas de segurança e conta com autenticação, token e autorização.

🔒 **Autenticação JWT**  
- Implementamos o padrão JWT para gerar tokens de acesso. Após o login, o usuário recebe um token assinado que autentica suas requisições de forma leve e segura.

🔒 **Criptografia com BCrypt**  
- Utilizamos a biblioteca Bcrypt para criar uma assinatura digital segura para as senhas, garantindo a proteção dos dados mesmo em caso de vazamentos.

---

# ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/twostacktech/TrustWay.git
cd TrustWay
```

Instale as dependências:
```bash
npm install
```

Execute o projeto:
```bash
npm run start:dev
```

---

# 🔮 Implementações futuras

📍 **Geolocalização e assistente inteligente**  
- API de geolocalização para que o usuário solicite assistência com apenas um clique.
- Assistente inteligente no app para tirar dúvidas sobre a apólice ou guiar o usuário em casos de sinistro.

📷 **Vistoria Digital Automática**  

Implementação de visão computacional para análise imediata de avarias. O usuário envia fotos pelo app e nossa IA identifica danos e gera laudos técnicos automaticamente.

🛠️ **Gestão do Veículo**  
- Lembrete de Manutenção: Notificar o usuário sobre a hora de trocar o óleo, pneus ou renovar o licenciamento, com base nos dados de ano e modelo já cadastrados.
- Histórico de Valor de Mercado: Integrar com a Tabela Fipe para mostrar ao usuário a desvalorização ou valorização do seu bem em tempo real.
  
---

## 👩‍💻 Integrantes

<p align="center">

<a href="https://github.com/BiiaBraga">
<img src="https://github.com/BiiaBraga.png" width="120"/>
</a>

<a href="https://github.com/jbgx014">
<img src="https://github.com/jbgx014.png" width="120"/>
</a>

<a href="https://github.com/macedoo15">
<img src="https://github.com/macedoo15.png" width="120"/>
</a>

<a href="https://github.com/lou-godoi">
<img src="https://github.com/lou-godoi.png" width="120"/>
</a>

<a href="https://github.com/luannaalcantara">
<img src="https://github.com/luannaalcantara.png" width="120"/>
</a>

<a href="https://github.com/lucaaas-araujo">
<img src="https://github.com/lucaaas-araujo.png" width="120"/>
</a>

</p>

---

# 👨‍💻 Desenvolvido por TwoStack

Empresa especializada no desenvolvimento de soluções digitais sob medida.

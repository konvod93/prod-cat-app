# 🛍️ ProductCat — Product Catalog App

**[Live Demo](https://konvod-prod-cat.netlify.app)** | **[GitHub](https://github.com/konvod93/prod-cat-app)**

---

## 🇺🇦 Українська

### Про проект

ProductCat — демонстраційний інтернет-магазин, створений як портфоліо-проект. Товари та ціни вигадані, оплата не працює. Реєстрація, кошик та замовлення функціонують у повному обсязі в цілях тестування.

### Технології

- **React 18** — UI
- **Vite** — збірка
- **Tailwind CSS** — стилізація
- **Supabase** — база даних, авторизація, зберігання файлів
- **React Router v6** — навігація
- **Heroicons** — іконки

### Функціональність

- Каталог товарів з фільтрацією за категорією, ціною, рейтингом та пагінацією
- Пошук товарів з автодоповненням
- Кошик з підтримкою неавторизованих користувачів (localStorage)
- Авторизація — реєстрація, вхід, відновлення пароля
- Профіль користувача — особисті дані, історія замовлень, обране, адреси доставки
- Симуляція оплати з формою картки
- Темна тема
- Адмін-панель із захистом через RLS (Supabase Row Level Security)
- Завантаження зображень товарів через Supabase Storage

### Безпека

- Row Level Security (RLS) на всіх таблицях користувача (`cart_items`, `orders`, `addresses`, `wishlist`)
- Авторизація адміна через Supabase з перевіркою ролі в `user_metadata`
- Публічні таблиці (`products`, `categories`) доступні лише для читання всім, редагування — тільки адміну

### Запуск локально

```bash
git clone https://github.com/konvod93/prod-cat-app.git
cd prod-cat-app
npm install
```

Створи файл `.env`:

```
VITE_SUPABASE_URL=твій_url
VITE_SUPABASE_ANON_KEY=твій_ключ
```

```bash
npm run dev
```

---

## 🇬🇧 English

### About

ProductCat is a demo e-commerce application built as a portfolio project. Products and prices are fictional, payment is not real. Registration, cart and orders are fully functional for testing purposes.

### Tech Stack

- **React 18** — UI
- **Vite** — build tool
- **Tailwind CSS** — styling
- **Supabase** — database, authentication, file storage
- **React Router v6** — routing
- **Heroicons** — icons

### Features

- Product catalog with filtering by category, price, rating and pagination
- Product search with autocomplete
- Shopping cart with guest support via localStorage
- Authentication — registration, login, password recovery
- User profile — personal data, order history, wishlist, delivery addresses
- Payment simulation with card form
- Dark mode
- Admin panel protected by Supabase Row Level Security
- Product image upload via Supabase Storage

### Security

- Row Level Security (RLS) on all user tables (`cart_items`, `orders`, `addresses`, `wishlist`)
- Admin authentication via Supabase with role check in `user_metadata`
- Public tables (`products`, `categories`) are read-only for everyone, write access for admin only

### Run Locally

```bash
git clone https://github.com/konvod93/prod-cat-app.git
cd prod-cat-app
npm install
```

Create `.env` file:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

```bash
npm run dev
```

### Deployment

Deployed on **Netlify** with automatic deploys from GitHub.
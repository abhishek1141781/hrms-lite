# Backend:
## pip install fastapi uvicorn sqlalchemy pymysql pydantic email-validator
## run server
uvicorn main:app --reload
## pip install python-dotenv

1. Create Virtual Env,python -m venv venv
2. Activate Env (Win),venv\Scripts\activate
3. Activate Env (Mac/Linux),source venv/bin/activate
4. Install Dependencies,pip install fastapi uvicorn sqlalchemy pymysql pydantic[email] python-dotenv
5. Run Seed Script,python seed.py
6. Start Server,uvicorn main:app --reload
7. Export Dependencies,pip freeze > requirements.txt

# Frontend:
npm create vite@latest hrms-frontend -- --template react
npm install
npm install axios lucide-react

## tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Action,Command
1. Create Project,npm create vite@latest . -- --template react
2. Install Core Packages,npm install axios lucide-react react-toastify
3. Install Tailwind v4,npm install tailwindcss @tailwindcss/postcss postcss autoprefixer
4. Initialize Tailwind,node_modules\.bin\tailwindcss init -p (Optional if files created manually)
5. Start Dev Server,npm run dev
6. Production Build,npm run build
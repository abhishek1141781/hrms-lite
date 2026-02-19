# Backend

## 1. 
```log
E:\1. Abhishek\0. Apps\fastapi-HRMS>uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['E:\\1. Abhishek\\0. Apps\\fastapi-HRMS']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [5608] using StatReload
ERROR:    Error loading ASGI app. Could not import module "main".
```


# Frontend
## 1. npm audit
```log
E:\1. Abhishek\0. Apps\fastapi-HRMS\hrms-frontend>npm audit

ajv  <8.18.0
Severity: moderate
ajv has ReDoS when using `$data` option - https://github.com/advisories/GHSA-2g4f-4pwh-qvx6
No fix available
node_modules/ajv
  @eslint/eslintrc  *
  Depends on vulnerable versions of ajv
  Depends on vulnerable versions of minimatch
  node_modules/@eslint/eslintrc
    eslint  0.7.1 - 2.0.0-rc.1 || >=4.1.0
    Depends on vulnerable versions of @eslint-community/eslint-utils
    Depends on vulnerable versions of @eslint/config-array
    Depends on vulnerable versions of @eslint/eslintrc
    Depends on vulnerable versions of ajv
    Depends on vulnerable versions of minimatch
    node_modules/eslint
      @eslint-community/eslint-utils  *
      Depends on vulnerable versions of eslint
      node_modules/@eslint-community/eslint-utils
      eslint-plugin-react-refresh  *
      Depends on vulnerable versions of eslint
      node_modules/eslint-plugin-react-refresh

minimatch  <10.2.1
Severity: high
minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern - https://github.com/advisories/GHSA-3ppc-4f35-3m26
No fix available
node_modules/minimatch
  @eslint/config-array  <=0.22.0
  Depends on vulnerable versions of minimatch
  node_modules/@eslint/config-array

7 vulnerabilities (3 moderate, 4 high)

Some issues need review, and may require choosing
a different dependency.
```

## 2. [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```log
8:39:06 PM [vite] Internal server error: [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
  Plugin: vite:css
  File: E:/1. Abhishek/0. Apps/fastapi-HRMS/hrms-frontend/src/index.css:undefined:NaN
      at at (E:\1. Abhishek\0. Apps\fastapi-HRMS\hrms-frontend\node_modules\tailwindcss\dist\lib.js:38:1643)
      at LazyResult.runOnRoot (E:\1. Abhishek\0. Apps\fastapi-HRMS\hrms-frontend\node_modules\postcss\lib\lazy-result.js:361:16)       
      at LazyResult.runAsync (E:\1. Abhishek\0. Apps\fastapi-HRMS\hrms-frontend\node_modules\postcss\lib\lazy-result.js:290:26)        
      at LazyResult.async (E:\1. Abhishek\0. Apps\fastapi-HRMS\hrms-frontend\node_modules\postcss\lib\lazy-result.js:192:30)
      at LazyResult.then (E:\1. Abhishek\0. Apps\fastapi-HRMS\hrms-frontend\node_modules\postcss\lib\lazy-result.js:436:17)
8:39:06 PM [vite] (client) Pre-transform error: [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
  Plugin: vite:css
  File: E:/1. Abhishek/0. Apps/fastapi-HRMS/hrms-frontend/src/index.css:undefined:NaN
```

## 3. 

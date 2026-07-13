# Common Errors and fixes 
A running list of you might hit setting up this project and how to fix them.

## Error 1:'npm install' fails with 'ENOENT'
**What you see:**
npm error code ENOENT 
npm errror path .../package.json 
npm error enoent could not read package.json 

**Why this happens:**
You're 'npm' in the wrong folder.It needs to find 'package.json' in the same folder you're in.

**Fix:**
```bash 
cd frontend 
npm install

```

**Prevention:**
Always check you're in the right folder before running 'npm'.
```bash 
pwd  
ls 

```

## Errror 2:Couldn't find any 'pages' or 'app' directory 
**Why this happens:**
package.json is outside the frontend/ folder.Next.js loks for app/ where package.json lives.

**Fix:**
Move package.json into frotend/ if it is not in frontend/ folder.
```bash 
cd frontend
mv ../package.json . 
rm -rf node_modules/ 
npm install 
npm run dev 

```

## Error 3:next.config.ts is not supported. 
**What you see:**
Error:Configuring Next.js via 'next.config.ts' is not supported

**Why this happens:**
You have both next.config.ts and next.config.js.Or your nex.js version is too old for .ts config

**Fix:**
Delete .ts version.Keep only .js:
```JavaScript 
/* @type {import('next').NextCOnfig} */
const nextConfig = {
    output: "standalone" ,
};
module.exports = nextConfig;

```


**Prevention:**
- Next.js 12 and below - Supports next.js only 
-  Next.js 13+ - next.ts 
- Never have both files at the same time 

## Error 4:Couldn't find a pages directory 
**What you see:**
Error:Couldn't find a 'pages' directory.Please create one. 

**Why it happens:**
Your next.js is too old.This project uses the App Router (app/ folder) which needs next.js 13.4+.


**Fix:**
Upgrade Next.js 
```bash 
npm install next@14 react@18 react-dom@18
npm run dev 
```

**Prevention:**
Check you framework version before starting 
```bash 
cat package.json | grep '"next"'

```

## Error 5:Module not found next-auth/react 
**What you see:**
Error:Module not found:Can't resolve 'next-auth/react'

**WHy it happens:**
The wrong version of next-auth is installed.The project needs v4 or v5 beta.

**Fix:**
```bash 
npm uninstall next-auth 
# install v5 for this project's code
npm install next-auth@beta 

```
**Prevention:**
After installing verify the versio n 
```bash 
cat node_modules/next-auth/package,json | grep '"version"'

```

## Error 6:Cannot find module '.prisma/client/default'
**What you see:**
Error:Cannot find module './prisma/client/defaut'

**Why this happens:** 
Prisma's generated files are missing.They get wiped when you delete node_modules.

**Fix:**
```bash 
npx prisma generate 
npm run dev 

```

**Prevetion:**
Always regeberate prisma after deleting node_modules .
```bash 
rm -rf node_modules 
npm install 
npx generate prisma 

```

## Error 7: Auth is not a function 
**What you see:**
TypeError:auth is not a function 

**Why this happens:**
Your code calls auth() from next-auth.But you installed v4 which doesn't have this function.
auth() is v5 beta feature.All of this can avoided by just installing v5 beta from the beginning.











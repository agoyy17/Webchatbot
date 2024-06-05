# Gunakan base image yang mendukung runtime yang sesuai dengan aplikasi web Anda, misalnya Node.js, Python, atau lainnya.
# Contoh menggunakan Node.js
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file dependensi package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi menggunakan npm atau yarn
RUN npm install

# Salin aplikasi Anda ke dalam container
COPY . .

# Port yang akan digunakan oleh aplikasi Anda
EXPOSE 8080

# Perintah yang akan dijalankan saat container berjalan
CMD ["npm", "start"]

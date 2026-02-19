# ✈️ Drain Operasyon Merkezi

**Drain Operasyon Merkezi**, Türk havacılık operasyonlarında uçak drain (yakıt/sıvı boşaltma) işlemlerini planlamak ve yönetmek için geliştirilmiş bir Progressive Web App (PWA) uygulamasıdır.

---

## 📋 Proje Özeti / Project Summary

Bu uygulama, TTMS verisi ve Atom tablosunu analiz ederek uçaklara otomatik drain slotu atar, personel ataması yapar ve baskıya hazır görev listeleri oluşturur.

*This application analyzes TTMS data and the Atom schedule table to automatically assign drain time slots to aircraft, assign personnel, and generate print-ready task lists.*

---

## 🚀 Özellikler / Features

- **TTMS Analizi**: TTMS verisinden negatif yakıt dengesi olan uçakları (drain gerektiren) otomatik olarak tespit eder.
- **Havuz Oluşturma**: Atom tablosundan TC tescilli uçakları ve kalkış saatlerini okuyarak kalkıştan 30–60 dakika öncesine drain slotu atar.
- **Çakışma Tespiti**: Aynı slota birden fazla uçak atanmasını önler; slot bulunamayan uçakları "Slot Yok" olarak işaretler.
- **Personel Atama**: 1–4 personel arasında seçim yapılarak görevler personele dağıtılır.
- **Görev Listesi (Zamana Göre)**: Drain saatine göre sıralanmış, baskıya hazır tablo.
- **Kayıt Listesi (Alfabetik)**: Tescil numarasına göre sıralanmış liste.
- **Filo Özeti**: Airbus ve Boeing uçak sayılarını ve toplam görev sayısını gösterir.
- **PWA Desteği**: Mobil cihazlara yüklenebilir, offline çalışabilir, otomatik güncelleme mekanizmasına sahiptir.

---

## 🛠️ Teknik Yapı / Tech Stack

| Dosya | Açıklama |
|-------|----------|
| `index.html` | Tüm uygulama mantığı ve arayüzü (vanilla HTML/CSS/JS) |
| `sw.js` | Service Worker – PWA cache ve offline desteği |
| `manifest.json` | PWA manifest dosyası |
| `drain.ico` | Uygulama ikonu |

- **Saf HTML/CSS/JavaScript** – harici bağımlılık yok
- **Service Worker** ile offline/PWA desteği
- **Responsive tasarım** – masaüstü ve mobil uyumlu

---

## 📖 Kullanım / Usage

### Adım 1 – TTMS Verisi
TTMS verisini ilgili alana yapıştırın ve **"Analiz Et"** butonuna tıklayın. Uygulama, negatif yakıt dengesi olan TC tescilli uçakları tespit eder ve filtre listesi oluşturur.

### Adım 2 – Atom Tablosu
Atom tablosunu ilgili alana yapıştırın ve **"Havuz Oluştur"** butonuna tıklayın. Her uçak için kalkış saatine göre otomatik drain slotu hesaplanır. İstenmeyen uçaklar listeden çıkarılabilir.

### Adım 3 – Personel Atama
Personel sayısını seçin ve isimlerini girin, ardından **"KESİN LİSTEYİ OLUŞTUR"** butonuna tıklayın.

### Adım 4 – Listeler
- **Görev Listesi (Zaman)**: Drain saatine göre sıralı operasyon listesi
- **Kayıt Listesi (Alfabetik)**: Tescil numarasına göre sıralı liste
- 🖨️ **Yazdır / PDF** butonu ile çıktı alınabilir.

---

## ✈️ Uçak Tipi Renk Kodları / Aircraft Type Color Codes

| Renk | Tip |
|------|-----|
| 🔵 Mavi | Airbus A31x / A32x |
| 🔴 Kırmızı | Airbus A33x / A35x |
| ⚫ Siyah | Boeing B7xx |

---

## 🔄 Güncelleme / Updates

`sw.js` dosyasındaki `cacheName` değişkeninin versiyon numarası artırılarak (örn. `drain-v9` → `drain-v10`) güncellemeler yayınlanabilir. Kullanıcılar sayfayı açtığında yeni versiyon otomatik olarak yüklenir.

---

## 📝 Lisans / License

Bu proje kişisel/operasyonel kullanım için geliştirilmiştir.  
*This project was developed for personal/operational use.*

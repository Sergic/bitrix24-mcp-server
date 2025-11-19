# 🚀 Guida Completa API Bitrix24 per Utenti Business
## Tutte le Funzioni Disponibili con Esempi

Questa guida completa mostra ogni funzione disponibile nella tua integrazione Bitrix24 con esempi pratici. Usa semplicemente il linguaggio naturale con Claude Desktop per eseguire qualsiasi di queste operazioni!

---

## 📋 Indice
1. [Avvio Rapido](#avvio-rapido)
2. [Gestione Contatti (5 Funzioni)](#gestione-contatti)
3. [Gestione Offerte (8 Funzioni)](#gestione-offerte)
4. [Gestione Lead (6 Funzioni)](#gestione-lead)
5. [Gestione Aziende (6 Funzioni)](#gestione-aziende)
6. [Filtri Avanzati Offerte (5 Funzioni)](#filtri-avanzati-offerte)
7. [Ricerca e Utilità (4 Funzioni)](#ricerca-e-utilità)
8. [Diagnostica Sistema (3 Funzioni)](#diagnostica-sistema)
9. [Scenari Business Reali](#scenari-business-reali)
10. [Guida Rapida API](#guida-rapida-api)

---

## 🎯 Avvio Rapido

### Cosa Puoi Fare
La tua integrazione Bitrix24 fornisce **37 funzioni diverse** in 8 categorie:
- **Gestione Contatti**: Creare, visualizzare, aggiornare ed elencare contatti
- **Gestione Offerte**: Gestione completa del ciclo di vita delle offerte con filtri avanzati
- **Gestione Lead**: Creazione, tracciamento e conversione dei lead
- **Gestione Aziende**: Gestione account aziendali
- **Filtri Avanzati Offerte**: Filtri basati su pipeline, budget e stato
- **Ricerca e Utilità**: Capacità di ricerca cross-CRM
- **Diagnostica Sistema**: Test di connessione e risoluzione problemi

### Come Usare Questa Guida
Ogni funzione qui sotto mostra:
- ✅ **Cosa puoi chiedere a Claude**
- 📝 **Parametri obbligatori vs opzionali**
- 💡 **Esempi pratici**
- 📊 **Risultati attesi**

---

## 👥 Gestione Contatti (5 Funzioni)

### 1. Crea Contatto (`bitrix24_create_contact`)

**Cosa puoi chiedere:**
- "Crea un nuovo contatto per Mario Rossi con email mario@azienda.com e telefono +393123456789"
- "Aggiungi un contatto: Sara Bianchi, TechCorp, Manager, sara@techcorp.com"
- "Crea contatto: Luca Verdi, telefono +393987654321, azienda ABC Srl"

**Parametri Obbligatori:**
- ✅ **Nome** (name)
- ✅ **Cognome** (lastName)

**Parametri Opzionali:**
- 📝 Telefono, Email, Azienda, Posizione, Commenti

**Esempio Richiesta:**
```
Crea un contatto per Maria Garcia, email maria@business.com, telefono +34123456789, 
azienda "Digital Solutions", posizione "Direttore Vendite", 
commenti "Incontrata alla fiera, interessata al nostro pacchetto premium"
```

**Risultato Atteso:**
```
✅ Contatto creato con ID: 789
- Nome: Maria Garcia
- Email: maria@business.com
- Telefono: +34123456789
- Azienda: Digital Solutions
- Posizione: Direttore Vendite
```

---

### 2. Ottieni Dettagli Contatto (`bitrix24_get_contact`)

**Cosa puoi chiedere:**
- "Mostrami i dettagli del contatto ID 123"
- "Ottieni informazioni sul contatto #456"
- "Visualizza contatto 789"

**Parametri Obbligatori:**
- ✅ **ID Contatto**

**Esempio Richiesta:**
```
Ottieni dettagli contatto per ID 456
```

**Risultato Atteso:**
```
Contatto #456:
- Nome: Mario Rossi
- Email: mario@azienda.com
- Telefono: +393123456789
- Azienda: TechStart Inc
- Posizione: CEO
- Creato: 2025-03-15
- Ultima Modifica: 2025-03-20
```

---

### 3. Elenca Contatti con Filtri (`bitrix24_list_contacts`)

**Cosa puoi chiedere:**
- "Elenca tutti i contatti con nome azienda contenente 'Tech'"
- "Mostrami 30 contatti con cognome 'Rossi'"
- "Ottieni contatti dove l'email contiene '@gmail.com'"

**Parametri Opzionali:**
- 📝 Limite (default: 20)
- 📝 Criteri di filtro

**Esempio Richiesta:**
```
Elenca 25 contatti dove il nome azienda contiene "Solutions"
```

**Risultato Atteso:**
```
Trovati 25 contatti:
1. Maria Garcia - Digital Solutions - maria@business.com
2. David Chen - Tech Solutions Ltd - david@techsolutions.com
3. Sara Wilson - Creative Solutions - sara@creative.com
...
```

---

### 4. Ottieni Ultimi Contatti (`bitrix24_get_latest_contacts`)

**Cosa puoi chiedere:**
- "Mostrami gli ultimi 15 contatti"
- "Ottieni i 5 contatti più recenti creati"
- "Elenca i 30 contatti più nuovi"

**Parametri Opzionali:**
- 📝 Limite (default: 20)

**Esempio Richiesta:**
```
Mostrami gli ultimi 10 contatti
```

**Risultato Atteso:**
```
Ultimi 10 Contatti (più recenti prima):
1. Anna Rodriguez (ID: 892) - anna@startup.com - Creato: 2025-07-02 ⭐ Più Recente
2. Peter Kim (ID: 891) - peter@innovation.com - Creato: 2025-07-01
3. Lisa Thompson (ID: 890) - lisa@consulting.com - Creato: 2025-06-30
...
```

---

### 5. Aggiorna Contatto (`bitrix24_update_contact`)

**Cosa puoi chiedere:**
- "Aggiorna contatto #123 per cambiare email a nuovaemail@azienda.com"
- "Cambia numero telefono contatto 456 a +393999999999"
- "Aggiorna contatto #789: aggiungi azienda 'New Corp', posizione 'Direttore'"

**Parametri Obbligatori:**
- ✅ **ID Contatto**

**Parametri Opzionali:**
- 📝 Nome, Cognome, Telefono, Email, Azienda, Posizione, Commenti

**Esempio Richiesta:**
```
Aggiorna contatto #456: cambia email a mario.rossi@nuovaazienda.com, 
aggiungi telefono +393555123456, aggiorna azienda a "Innovation Labs"
```

**Risultato Atteso:**
```
✅ Contatto #456 aggiornato con successo
Campi aggiornati:
- Email: mario.rossi@nuovaazienda.com
- Telefono: +393555123456
- Azienda: Innovation Labs
```

---

## 💼 Gestione Offerte (8 Funzioni)

### 1. Crea Offerta (`bitrix24_create_deal`)

**Cosa puoi chiedere:**
- "Crea un'offerta: 'Progetto Sviluppo Sito Web', importo €15000, valuta EUR"
- "Aggiungi un'offerta per contatto #123: 'Licenza Software', €8500"
- "Crea offerta: 'Servizi Consulenza', €12000, fase 'NEGOZIAZIONE'"

**Parametri Obbligatori:**
- ✅ **Titolo**

**Parametri Opzionali:**
- 📝 Importo, Valuta (default: EUR), ID Contatto, ID Fase, Commenti

**Esempio Richiesta:**
```
Crea un'offerta: "Sviluppo App Mobile", importo €25000, valuta EUR, 
ID contatto 456, commenti "Progetto 3 mesi, include app iOS e Android"
```

**Risultato Atteso:**
```
✅ Offerta creata con ID: 234
- Titolo: Sviluppo App Mobile
- Importo: €25.000
- Valuta: EUR
- Contatto: #456
- Stato: Nuovo
```

---

### 2. Ottieni Dettagli Offerta (`bitrix24_get_deal`)

**Cosa puoi chiedere:**
- "Mostrami i dettagli dell'offerta ID 234"
- "Ottieni informazioni sull'offerta #567"
- "Visualizza offerta 890"

**Parametri Obbligatori:**
- ✅ **ID Offerta**

**Esempio Richiesta:**
```
Mostrami dettagli offerta per ID 234
```

**Risultato Atteso:**
```
Offerta #234:
- Titolo: Sviluppo App Mobile
- Importo: €25.000
- Valuta: EUR
- Fase: NEGOZIAZIONE
- Contatto: Mario Rossi (#456)
- Creato: 2025-06-15
- Chiusura Prevista: 2025-09-15
- Commenti: Progetto 3 mesi, include app iOS e Android
```

---

### 3. Elenca Offerte con Opzioni Avanzate (`bitrix24_list_deals`)

**Cosa puoi chiedere:**
- "Elenca 30 offerte ordinate per importo decrescente"
- "Mostra offerte con titolo contenente 'Progetto' ordinate per data creazione"
- "Ottieni offerte ordinate per data modifica, limite 15"

**Parametri Opzionali:**
- 📝 Limite (default: 20)
- 📝 Criteri di filtro
- 📝 Ordina per: DATE_CREATE, DATE_MODIFY, ID, TITLE
- 📝 Direzione ordine: ASC, DESC (default: DESC)

**Esempio Richiesta:**
```
Elenca 25 offerte con titolo contenente "Sviluppo" ordinate per importo decrescente
```

**Risultato Atteso:**
```
Trovate 25 Offerte Sviluppo (per importo):
1. Sviluppo Software Enterprise - €85.000 - Fase: NEGOZIAZIONE
2. Sviluppo Piattaforma E-commerce - €45.000 - Fase: PROPOSTA
3. Sviluppo App Mobile - €25.000 - Fase: VINTA
...
```

---

### 4. Ottieni Ultime Offerte (`bitrix24_get_latest_deals`)

**Cosa puoi chiedere:**
- "Mostrami le ultime 20 offerte"
- "Ottieni le 10 offerte più recenti create"
- "Elenca le 5 offerte più nuove"

**Parametri Opzionali:**
- 📝 Limite (default: 20)

**Esempio Richiesta:**
```
Mostrami le ultime 15 offerte
```

**Risultato Atteso:**
```
Ultime 15 Offerte (più recenti prima):
1. Progetto Migrazione Cloud (ID: 345) - €35.000 - Creato: 2025-07-02 ⭐ Più Recente
2. Redesign Sito Web (ID: 344) - €12.000 - Creato: 2025-07-01
3. Ottimizzazione SEO (ID: 343) - €8.500 - Creato: 2025-06-30
...
```

---

### 5. Ottieni Offerte da Intervallo Date (`bitrix24_get_deals_from_date_range`)

**Cosa puoi chiedere:**
- "Ottieni tutte le offerte create tra 1 gennaio 2025 e 31 marzo 2025"
- "Mostrami offerte da giugno 2025"
- "Elenca offerte create dopo il 15 maggio 2025"

**Parametri Obbligatori:**
- ✅ **Data Inizio** (formato YYYY-MM-DD)

**Parametri Opzionali:**
- 📝 Data Fine (formato YYYY-MM-DD)
- 📝 Limite (default: 50)

**Esempio Richiesta:**
```
Ottieni tutte le offerte create tra 2025-06-01 e 2025-06-30, limite 30
```

**Risultato Atteso:**
```
Trovate 30 offerte da giugno 2025:
1. Campagna Marketing Q3 - €18.000 - Creato: 2025-06-28
2. Ottimizzazione Database - €22.000 - Creato: 2025-06-25
3. Audit Sicurezza - €15.000 - Creato: 2025-06-20
...
Valore Totale: €485.000
```

---

### 6. Aggiorna Offerta (`bitrix24_update_deal`)

**Cosa puoi chiedere:**
- "Aggiorna offerta #234 per impostare importo a €30000"
- "Cambia fase offerta 567 a 'VINTA'"
- "Aggiorna offerta #890: aggiungi commenti 'Cliente ha approvato proposta finale'"

**Parametri Obbligatori:**
- ✅ **ID Offerta**

**Parametri Opzionali:**
- 📝 Titolo, Importo, Valuta, ID Contatto, ID Fase, Commenti

**Esempio Richiesta:**
```
Aggiorna offerta #234: cambia importo a €30000, imposta fase a "VINTA", 
aggiungi commenti "Ambito progetto espanso, cliente ha firmato contratto"
```

**Risultato Atteso:**
```
✅ Offerta #234 aggiornata con successo
Campi aggiornati:
- Importo: €30.000 (era €25.000)
- Fase: VINTA (era NEGOZIAZIONE)
- Commenti: Ambito progetto espanso, cliente ha firmato contratto
```

---

### 7. Ottieni Pipeline Offerte (`bitrix24_get_deal_pipelines`)

**Cosa puoi chiedere:**
- "Mostrami tutte le pipeline delle offerte"
- "Elenca categorie offerte disponibili"
- "Ottieni informazioni pipeline offerte"

**Nessun Parametro Richiesto**

**Esempio Richiesta:**
```
Mostrami tutte le pipeline delle offerte
```

**Risultato Atteso:**
```
Pipeline Offerte Disponibili:
1. Pipeline Vendite (ID: 0) - Processo vendite standard
2. Vendite Enterprise (ID: 1) - Offerte grandi clienti
3. Ricavi Ricorrenti (ID: 2) - Offerte basate su abbonamento
4. Canale Partner (ID: 3) - Offerte da partner
```

---

### 8. Ottieni Fasi Offerte (`bitrix24_get_deal_stages`)

**Cosa puoi chiedere:**
- "Mostrami tutte le fasi delle offerte"
- "Ottieni fasi per pipeline ID 1"
- "Elenca fasi offerte per pipeline Vendite Enterprise"

**Parametri Opzionali:**
- 📝 ID Pipeline (se non fornito, mostra tutte le fasi)

**Esempio Richiesta:**
```
Ottieni fasi per pipeline ID 1
```

**Risultato Atteso:**
```
Fasi Offerte per Pipeline Vendite Enterprise:
1. NUOVO (ID: C1:NEW) - Contatto iniziale
2. QUALIFICAZIONE (ID: C1:QUALIFICATION) - Valutazione necessità
3. PROPOSTA (ID: C1:PROPOSAL) - Proposta inviata
4. NEGOZIAZIONE (ID: C1:NEGOTIATION) - Discussione termini
5. VINTA (ID: C1:WON) - Offerta chiusa con successo
6. PERSA (ID: C1:LOST) - Offerta persa
```

---

## 🎯 Gestione Lead (6 Funzioni)

### 1. Crea Lead (`bitrix24_create_lead`)

**Cosa puoi chiedere:**
- "Crea un lead: 'Richiesta Sito Web', nome Mario Bianchi, email mario@startup.com"
- "Aggiungi un lead da modulo contatto: Azienda TechStart, telefono +393123456789"
- "Crea lead: 'Richiesta Demo Prodotto', importo previsto €5000"

**Parametri Obbligatori:**
- ✅ **Titolo**

**Parametri Opzionali:**
- 📝 Nome, Cognome, Azienda, Telefono, Email, ID Fonte, ID Stato, Importo Previsto, Valuta, Commenti

**Esempio Richiesta:**
```
Crea un lead: "Richiesta Software Enterprise", nome "Sara", cognome "Johnson", 
azienda "Global Corp", email "sara@globalcorp.com", telefono "+393555987654", 
importo previsto "50000", valuta "EUR", fonte "WEB", 
commenti "Interessata al nostro pacchetto enterprise, necessita demo"
```

**Risultato Atteso:**
```
✅ Lead creato con ID: 567
- Titolo: Richiesta Software Enterprise
- Contatto: Sara Johnson
- Azienda: Global Corp
- Email: sara@globalcorp.com
- Valore Previsto: €50.000
- Fonte: WEB
- Stato: NUOVO
```

---

### 2. Ottieni Dettagli Lead (`bitrix24_get_lead`)

**Cosa puoi chiedere:**
- "Mostrami i dettagli del lead ID 567"
- "Ottieni informazioni sul lead #890"
- "Visualizza lead 123"

**Parametri Obbligatori:**
- ✅ **ID Lead**

**Esempio Richiesta:**
```
Mostrami dettagli lead per ID 567
```

**Risultato Atteso:**
```
Lead #567:
- Titolo: Richiesta Software Enterprise
- Contatto: Sara Johnson
- Azienda: Global Corp
- Email: sara@globalcorp.com
- Telefono: +393555987654
- Valore Previsto: €50.000
- Fonte: WEB
- Stato: QUALIFICATO
- Creato: 2025-06-20
- Commenti: Interessata al nostro pacchetto enterprise, necessita demo
```

---

### 3. Elenca Lead con Filtri (`bitrix24_list_leads`)

**Cosa puoi chiedere:**
- "Elenca 25 lead con stato 'NUOVO' ordinati per data creazione"
- "Mostra lead da azienda contenente 'Tech' ordinati per importo previsto"
- "Ottieni lead con fonte 'WEB' dall'ultimo mese"

**Parametri Opzionali:**
- 📝 Limite (default: 20)
- 📝 Criteri di filtro
- 📝 Ordina per: DATE_CREATE, DATE_MODIFY, ID, TITLE
- 📝 Direzione ordine: ASC, DESC (default: DESC)

**Esempio Richiesta:**
```
Elenca 20 lead con stato "NUOVO" ordinati per importo previsto decrescente
```

**Risultato Atteso:**
```
Trovati 20 lead NUOVI (per valore previsto):
1. Progetto Integrazione Enterprise - €75.000 - Global Tech Inc
2. Trasformazione Digitale - €60.000 - Innovation Corp  
3. Migrazione Cloud - €45.000 - StartupXYZ
...
Valore Pipeline Totale: €580.000
```

---

### 4. Ottieni Ultimi Lead (`bitrix24_get_latest_leads`)

**Cosa puoi chiedere:**
- "Mostrami gli ultimi 15 lead"
- "Ottieni i 10 lead più recenti creati"
- "Elenca i 25 lead più nuovi"

**Parametri Opzionali:**
- 📝 Limite (default: 20)

**Esempio Richiesta:**
```
Mostrami gli ultimi 12 lead
```

**Risultato Atteso:**
```
Ultimi 12 Lead (più recenti prima):
1. Consulenza App Mobile (ID: 678) - TechStart - Creato: 2025-07-02 ⭐ Più Recente
2. Richiesta Redesign Sito (ID: 677) - Creative Agency - Creato: 2025-07-01
3. Richiesta Servizi SEO (ID: 676) - Local Business - Creato: 2025-06-30
...
```

---

### 5. Ottieni Lead da Intervallo Date (`bitrix24_get_leads_from_date_range`)

**Cosa puoi chiedere:**
- "Ottieni tutti i lead creati tra 1 maggio 2025 e 31 maggio 2025"
- "Mostrami lead da questo trimestre"
- "Elenca lead creati dopo il 15 giugno 2025"

**Parametri Obbligatori:**
- ✅ **Data Inizio** (formato YYYY-MM-DD)

**Parametri Opzionali:**
- 📝 Data Fine (formato YYYY-MM-DD)
- 📝 Limite (default: 50)

**Esempio Richiesta:**
```
Ottieni tutti i lead creati tra 2025-06-01 e 2025-06-30
```

**Risultato Atteso:**
```
Trovati 45 lead da giugno 2025:
1. Piattaforma E-commerce - €35.000 - Creato: 2025-06-29
2. Marketing Automation - €18.000 - Creato: 2025-06-28
3. Integrazione CRM - €25.000 - Creato: 2025-06-25
...
Valore Previsto Totale: €890.000
Tasso Conversione: 23% (10 convertiti in offerte)
```

---

### 6. Aggiorna Lead (`bitrix24_update_lead`)

**Cosa puoi chiedere:**
- "Aggiorna lead #567 per cambiare stato a 'QUALIFICATO'"
- "Cambia importo previsto lead 890 a €75000"
- "Aggiorna lead #123: aggiungi telefono +393123456789, imposta fonte a 'CHIAMATA'"

**Parametri Obbligatori:**
- ✅ **ID Lead**

**Parametri Opzionali:**
- 📝 Titolo, Nome, Cognome, Azienda, Telefono, Email, ID Fonte, ID Stato, Importo Previsto, Valuta, Commenti

**Esempio Richiesta:**
```
Aggiorna lead #567: cambia stato a "QUALIFICATO", imposta importo previsto a "75000", 
aggiungi commenti "Fatta chiamata demo, molto interessato, decisione prevista settimana prossima"
```

**Risultato Atteso:**
```
✅ Lead #567 aggiornato con successo
Campi aggiornati:
- Stato: QUALIFICATO (era NUOVO)
- Importo Previsto: €75.000 (era €50.000)
- Commenti: Fatta chiamata demo, molto interessato, decisione prevista settimana prossima
```

---

## 🏢 Gestione Aziende (6 Funzioni)

### 1. Crea Azienda (`bitrix24_create_company`)

**Cosa puoi chiedere:**
- "Crea un'azienda: 'TechCorp Solutions', tipo CLIENTE, settore SOFTWARE"
- "Aggiungi azienda: Global Innovations, 500 dipendenti, fatturato €10M"
- "Crea azienda con sito web techstart.com, email info@techstart.com"

**Parametri Obbligatori:**
- ✅ **Nome Azienda** (title)

**Parametri Opzionali:**
- 📝 Tipo Azienda, Settore, Telefono, Email, Sito Web, Indirizzo, Dipendenti, Fatturato, Commenti, ID Utente Assegnato

**Esempio Richiesta:**
```
Crea un'azienda: "Digital Innovation Labs", tipo "CLIENTE", settore "SOFTWARE", 
telefono "+393555123456", email "contatto@digilabs.com", sito web "digilabs.com", 
indirizzo "Via Tech 123, Milano, MI", dipendenti "150", 
fatturato "25000000", commenti "Cliente importante, focus software enterprise"
```

**Risultato Atteso:**
```
✅ Azienda creata con ID: 345
- Nome: Digital Innovation Labs
- Tipo: CLIENTE
- Settore: SOFTWARE
- Dipendenti: 150
- Fatturato: €25.000.000
- Sito Web: digilabs.com
- Contatto: contatto@digilabs.com
```

---

### 2. Ottieni Dettagli Azienda (`bitrix24_get_company`)

**Cosa puoi chiedere:**
- "Mostrami i dettagli dell'azienda ID 345"
- "Ottieni informazioni sull'azienda #678"
- "Visualizza azienda 901"

**Parametri Obbligatori:**
- ✅ **ID Azienda**

**Esempio Richiesta:**
```
Mostrami dettagli azienda per ID 345
```

**Risultato Atteso:**
```
Azienda #345:
- Nome: Digital Innovation Labs
- Tipo: CLIENTE
- Settore: SOFTWARE
- Telefono: +393555123456
- Email: contatto@digilabs.com
- Sito Web: digilabs.com
- Indirizzo: Via Tech 123, Milano, MI
- Dipendenti: 150
- Fatturato Annuo: €25.000.000
- Creato: 2025-05-15
- Assegnato a: Team Lead Vendite
```

---

### 3. Elenca Aziende con Filtri (`bitrix24_list_companies`)

**Cosa puoi chiedere:**
- "Elenca 30 aziende nel settore SOFTWARE"
- "Mostra aziende con più di 100 dipendenti"
- "Ottieni aziende tipo CLIENTE ordinate per fatturato"

**Parametri Opzionali:**
- 📝 Limite (default: 20)
- 📝 Criteri di filtro
- 📝 Ordina per: DATE_CREATE, DATE_MODIFY, ID, TITLE
- 📝 Direzione ordine: ASC, DESC (default: DESC)

**Esempio Richiesta:**
```
Elenca 25 aziende con tipo "CLIENTE" nel settore "SOFTWARE" ordinate per fatturato decrescente
```

**Risultato Atteso:**
```
Trovate 25 aziende CLIENTI SOFTWARE (per fatturato):
1. Enterprise Tech Corp - €100M fatturato - 2.500 dipendenti
2. Digital Innovation Labs - €25M fatturato - 150 dipendenti
3. StartupXYZ Solutions - €15M fatturato - 85 dipendenti
...
Valore Mercato Totale: €485M
```

---

### 4. Aggiorna Azienda (`bitrix24_update_company`)

**Cosa puoi chiedere:**
- "Aggiorna azienda #345 per cambiare fatturato a €30000000"
- "Cambia telefono azienda 678 a +393999888777"
- "Aggiorna azienda #901: aggiungi sito web nuovosito.com, cambia settore a FINTECH"

**Parametri Obbligatori:**
- ✅ **ID Azienda**

**Parametri Opzionali:**
- 📝 Tutti i campi azienda (come per creazione)

**Esempio Richiesta:**
```
Aggiorna azienda #345: cambia fatturato a "30000000", aggiorna dipendenti a "200", 
aggiungi commenti "Espanse operazioni, acquisita azienda più piccola"
```

**Risultato Atteso:**
```
✅ Azienda #345 aggiornata con successo
Campi aggiornati:
- Fatturato: €30.000.000 (era €25.000.000)
- Dipendenti: 200 (era 150)
- Commenti: Espanse operazioni, acquisita azienda più piccola
```

---

### 5. Ottieni Ultime Aziende (`bitrix24_get_latest_companies`)

**Cosa puoi chiedere:**
- "Mostrami le ultime 20 aziende"
- "Ottieni le 15 aziende più recenti create"
- "Elenca le 10 aziende più nuove"

**Parametri Opzionali:**
- 📝 Limite (default: 20)

**Esempio Richiesta:**
```
Mostrami le ultime 15 aziende
```

**Risultato Atteso:**
```
Ultime 15 Aziende (più recenti prima):
1. AI Innovations Inc (ID: 456) - SOFTWARE - Creato: 2025-07-02 ⭐ Più Recente
2. Green Energy Solutions (ID: 455) - ENERGIA - Creato: 2025-07-01
3. FinTech Startup (ID: 454) - FINTECH - Creato: 2025-06-30
...
```

---

### 6. Ottieni Aziende da Intervallo Date (`bitrix24_get_companies_from_date_range`)

**Cosa puoi chiedere:**
- "Ottieni tutte le aziende create tra 1 aprile 2025 e 30 giugno 2025"
- "Mostrami aziende dal Q2 2025"
- "Elenca aziende create dopo il 1 maggio 2025"

**Parametri Obbligatori:**
- ✅ **Data Inizio** (formato YYYY-MM-DD)

**Parametri Opzionali:**
- 📝 Data Fine (formato YYYY-MM-DD)
- 📝 Limite (default: 50)

**Esempio Richiesta:**
```
Ottieni tutte le aziende create tra 2025-05-01 e 2025-06-30, limite 40
```

**Risultato Atteso:**
```
Trovate 40 aziende da maggio-giugno 2025:
1. Blockchain Solutions Ltd - FINTECH - €50M fatturato
2. IoT Devices Corp - HARDWARE - €35M fatturato
3. Cloud Services Inc - SOFTWARE - €28M fatturato
...
Ripartizione per Settore:
- SOFTWARE: 15 aziende (37,5%)
- FINTECH: 8 aziende (20%)
- HARDWARE: 7 aziende (17,5%)
- Altri: 10 aziende (25%)
```

---

## 🔍 Filtri Avanzati Offerte (5 Funzioni)

### 1. Filtra Offerte per Pipeline (`bitrix24_filter_deals_by_pipeline`)

**Cosa puoi chiedere:**
- "Mostrami tutte le offerte nella pipeline Vendite Enterprise"
- "Ottieni offerte dalla pipeline ID 1 ordinate per importo"
- "Elenca 30 offerte nella pipeline Ricavi Ricorrenti"

**Parametri Obbligatori:**
- ✅ **ID Pipeline**

**Parametri Opzionali:**
- 📝 Limite (default: 50)
- 📝 Ordina per: DATE_CREATE, DATE_MODIFY, ID, TITLE, OPPORTUNITY
- 📝 Direzione ordine: ASC, DESC (default: DESC)

**Esempio Richiesta:**
```
Mostrami 25 offerte nella pipeline ID 1 ordinate per importo decrescente
```

**Risultato Atteso:**
```
Trovate 25 offerte nella Pipeline Vendite Enterprise:
1. Implementazione ERP Globale - €150.000 - NEGOZIAZIONE
2. Migrazione Infrastruttura Cloud - €85.000 - PROPOSTA  
3. Audit Sicurezza & Compliance - €65.000 - QUALIFICAZIONE
...
Valore Pipeline Totale: €1.250.000
Dimensione Media Offerta: €50.000
```

---

### 2. Filtra Offerte per Budget (`bitrix24_filter_deals_by_budget`)

**Cosa puoi chiedere:**
- "Mostrami offerte del valore tra €10000 e €50000"
- "Ottieni offerte con budget oltre €100000 in EUR"
- "Elenca offerte del valore superiore a $25000 in USD"

**Parametri Obbligatori:**
- ✅ **Budget Minimo**

**Parametri Opzionali:**
- 📝 Budget Massimo
- 📝 Valuta (default: EUR)
- 📝 Limite (default: 50)
- 📝 Ordina per: DATE_CREATE, DATE_MODIFY, ID, TITLE, OPPORTUNITY
- 📝 Direzione ordine: ASC, DESC (default: DESC per OPPORTUNITY)

**Esempio Richiesta:**
```
Mostrami offerte con budget tra €25000 e €100000 in EUR, limite 30, ordinate per data creazione
```

**Risultato Atteso:**
```
Trovate 30 offerte con budget €25.000 - €100.000:
1. Licenza Software Enterprise - €85.000 - Creato: 2025-06-28
2. Bundle Sito Web & App Mobile - €45.000 - Creato: 2025-06-25
3. Campagna Marketing Digitale - €35.000 - Creato: 2025-06-20
...
Valore Totale: €1.680.000
Dimensione Media Offerta: €56.000
```

---

### 3. Filtra Offerte per Stato/Fase (`bitrix24_filter_deals_by_status`)

**Cosa puoi chiedere:**
- "Mostrami offerte nelle fasi NEGOZIAZIONE e PROPOSTA"
- "Ottieni tutte le offerte VINTE dall'ultimo trimestre"
- "Elenca offerte in fase NUOVO per pipeline ID 1"

**Parametri Obbligatori:**
- ✅ **ID Fasi** (array)

**Parametri Opzionali:**
- 📝 ID Pipeline (per limitare a pipeline specifica)
- 📝 Limite (default: 50)
- 📝 Ordina per: DATE_CREATE, DATE_MODIFY, ID, TITLE, OPPORTUNITY
- 📝 Direzione ordine: ASC, DESC (default: DESC)

**Esempio Richiesta:**
```
Mostrami offerte nelle fasi "NEGOZIAZIONE" e "PROPOSTA" per pipeline ID 1, limite 20
```

**Risultato Atteso:**
```
Trovate 20 offerte nelle fasi NEGOZIAZIONE/PROPOSTA (Pipeline Enterprise):

NEGOZIAZIONE (8 offerte):
1. Implementazione ERP Globale - €150.000 - 45 giorni in fase
2. Progetto Migrazione Cloud - €85.000 - 12 giorni in fase
...

PROPOSTA (12 offerte):  
1. Pacchetto Audit Sicurezza - €65.000 - 8 giorni in fase
2. Sviluppo Software Custom - €55.000 - 15 giorni in fase
...

Valore Totale: €1.125.000
```

---

### 4. Ottieni Pipeline Offerte (`bitrix24_get_deal_pipelines`)

**Cosa puoi chiedere:**
- "Mostrami tutte le pipeline offerte disponibili"
- "Elenca categorie offerte e loro ID"
- "Ottieni informazioni pipeline"

**Nessun Parametro Richiesto**

**Esempio Richiesta:**
```
Mostrami tutte le pipeline offerte disponibili
```

**Risultato Atteso:**
```
Pipeline Offerte Disponibili:
1. Vendite Standard (ID: 0)
   - Descrizione: Processo vendite standard
   - Offerte Attive: 45
   - Valore Totale: €850.000

2. Vendite Enterprise (ID: 1)  
   - Descrizione: Offerte grandi clienti >€50K
   - Offerte Attive: 12
   - Valore Totale: €1.200.000

3. Ricavi Ricorrenti (ID: 2)
   - Descrizione: Abbonamenti e manutenzione
   - Offerte Attive: 28
   - Valore Totale: €420.000

4. Canale Partner (ID: 3)
   - Descrizione: Offerte da partner
   - Offerte Attive: 8
   - Valore Totale: €180.000
```

---

### 5. Ottieni Fasi Offerte per Pipeline (`bitrix24_get_deal_stages`)

**Cosa puoi chiedere:**
- "Mostrami fasi per pipeline Vendite Enterprise"
- "Ottieni tutte le fasi offerte per pipeline ID 2"
- "Elenca fasi e loro ID per pipeline standard"

**Parametri Opzionali:**
- 📝 ID Pipeline (se non fornito, mostra tutte le fasi)

**Esempio Richiesta:**
```
Mostrami fasi per pipeline ID 1
```

**Risultato Atteso:**
```
Fasi Offerte per Pipeline Vendite Enterprise (ID: 1):

1. NUOVO (ID: C1:NEW)
   - Descrizione: Contatto iniziale effettuato
   - Offerte Attive: 3 (€125.000)

2. QUALIFICAZIONE (ID: C1:QUALIFICATION)  
   - Descrizione: Valutazione necessità e conferma budget
   - Offerte Attive: 4 (€280.000)

3. PROPOSTA (ID: C1:PROPOSAL)
   - Descrizione: Proposta formale inviata
   - Offerte Attive: 2 (€195.000)

4. NEGOZIAZIONE (ID: C1:NEGOTIATION)
   - Descrizione: Discussione termini e prezzi
   - Offerte Attive: 2 (€235.000)

5. VINTA (ID: C1:WON)
   - Descrizione: Offerta chiusa con successo
   - Offerte Chiuse: 15 (€2.100.000 YTD)

6. PERSA (ID: C1:LOST)
   - Descrizione: Offerta persa per concorrente/budget
   - Offerte Perse: 8 (€450.000 YTD)
```

---

## 🔍 Ricerca e Utilità (4 Funzioni)

### 1. Ricerca nel CRM (`bitrix24_search_crm`)

**Cosa puoi chiedere:**
- "Cerca 'mario@azienda.com' in tutti i dati CRM"
- "Trova tutti i record con numero telefono '+393123456789'"
- "Cerca 'TechCorp' solo in contatti e aziende"

**Parametri Obbligatori:**
- ✅ **Query di Ricerca**

**Parametri Opzionali:**
- 📝 Tipi Entità (default: contact, company, deal, lead)

**Esempio Richiesta:**
```
Cerca "sara@globalcorp.com" in tutte le entità CRM
```

**Risultato Atteso:**
```
Risultati Ricerca per "sara@globalcorp.com":

CONTATTI (1 corrispondenza):
- Sara Johnson (ID: 456) - Global Corp - sara@globalcorp.com

LEAD (1 corrispondenza):  
- Richiesta Software Enterprise (ID: 567) - Sara Johnson - sara@globalcorp.com

OFFERTE (2 corrispondenze):
- Licenza Software Enterprise (ID: 234) - Contatto: Sara Johnson
- Progetto Migrazione Cloud (ID: 345) - Contatto: Sara Johnson

AZIENDE (1 corrispondenza):
- Global Corp (ID: 789) - Contatto: sara@globalcorp.com
```

---

### 2. Valida Connessione Webhook (`bitrix24_validate_webhook`)

**Cosa puoi chiedere:**
- "Controlla se la connessione Bitrix24 funziona"
- "Valida il webhook"
- "Testa la connessione API"

**Nessun Parametro Richiesto**

**Esempio Richiesta:**
```
Controlla se la connessione Bitrix24 funziona
```

**Risultato Atteso:**
```
✅ Stato Connessione Webhook: VALIDA
- Connessione: Attiva
- Tempo Risposta: 245ms
- Accesso API: Permessi completi
- Ultimo Test: 2025-07-02 07:15:00
```

---

## 🛠️ Diagnostica Sistema (3 Funzioni)

### 1. Diagnostica Permessi (`bitrix24_diagnose_permissions`)

**Cosa puoi chiedere:**
- "Diagnostica eventuali problemi di permessi"
- "Controlla che accesso CRM ho"
- "Testa tutti i permessi API"

**Nessun Parametro Richiesto**

**Esempio Richiesta:**
```
Diagnostica eventuali problemi di permessi
```

**Risultato Atteso:**
```
🔍 Risultati Diagnostica Permessi:

✅ STATO WEBHOOK: Valido
✅ INFO APP: Accessibile
✅ ACCESSO CRM: Accesso completo garantito
✅ CONTATTI: Permessi lettura/scrittura
✅ OFFERTE: Permessi lettura/scrittura  
✅ LEAD: Permessi lettura/scrittura
✅ AZIENDE: Permessi lettura/scrittura

📊 RIEPILOGO:
- Tutte le funzioni CRM principali disponibili
- Nessuna restrizione permessi rilevata
- Limiti API: Normali (2 req/sec)
```

---

### 2. Controlla Impostazioni CRM (`bitrix24_check_crm_settings`)

**Cosa puoi chiedere:**
- "Controlla impostazioni e configurazione CRM"
- "Verifica campi lead e stati"
- "Ottieni informazioni modalità CRM"

**Nessun Parametro Richiesto**

**Esempio Richiesta:**
```
Controlla impostazioni e configurazione CRM
```

**Risultato Atteso:**
```
🔧 Stato Configurazione CRM:

CAMPI LEAD: ✅ Disponibili
- Campi standard: ID, TITLE, NAME, LAST_NAME, COMPANY_TITLE
- Campi contatto: PHONE, EMAIL
- Campi business: OPPORTUNITY, CURRENCY_ID, SOURCE_ID, STATUS_ID
- Campi sistema: DATE_CREATE, DATE_MODIFY, ASSIGNED_BY_ID

STATI LEAD: ✅ Configurati
- NUOVO: Nuovo lead
- IN_PROCESS: In elaborazione
- PROCESSED: Elaborato
- JUNK: Spam/Non valido

MODALITÀ CRM: ✅ Attiva
- Elaborazione lead: Abilitata
- Conversione offerte: Automatica
- Controllo duplicati: Attivo
```

---

### 3. Testa API Lead (`bitrix24_test_leads_api`)

**Cosa puoi chiedere:**
- "Testa la funzionalità API lead"
- "Controlla se i lead funzionano correttamente"
- "Diagnostica problemi API lead"

**Nessun Parametro Richiesto**

**Esempio Richiesta:**
```
Testa la funzionalità API lead
```

**Risultato Atteso:**
```
🧪 Risultati Test API Lead:

✅ LISTA BASE: Successo (Recuperati 15 lead)
✅ TEST CAMPI: Successo (Tutti i campi lead accessibili)
✅ LISTA PARAMETRIZZATA: Successo (Filtri e ordinamento funzionano)
✅ TEST CONTEGGIO: Successo (Totale: 156 lead nel sistema)

📈 PRESTAZIONI:
- Tempo risposta medio: 180ms
- Integrità dati: 100%
- Nessun errore API rilevato

🎯 RACCOMANDAZIONI:
- API funziona in modo ottimale
- Nessun problema rilevato
- Pronto per uso produzione
```

---

## 💼 Scenari Business Reali

### Gestione CRM Quotidiana

**Revisione Pipeline Mattutina:**
```
"Mostrami gli ultimi 10 lead di ieri"
"Ottieni tutte le offerte in fase NEGOZIAZIONE"
"Elenca task assegnati a me in scadenza oggi"
```

**Processo Qualificazione Lead:**
```
"Crea un lead: 'Richiesta CRM Enterprise', nome Mario Rossi, azienda TechCorp, 
email mario@techcorp.com, importo previsto €45000, fonte WEB"

"Aggiorna lead #567 a stato QUALIFICATO, aggiungi commenti 'Budget confermato, identificato decision maker'"

"Crea un'offerta da lead qualificato: 'Implementazione CRM TechCorp', importo €45000, contatto #456"
```

**Gestione Pipeline Offerte:**
```
"Mostrami tutte le offerte nella pipeline Vendite Enterprise del valore oltre €50000"
"Filtra offerte per budget tra €25000 e €100000 ordinate per data creazione"
"Aggiorna offerta #234 a fase VINTA, aggiungi commenti 'Contratto firmato, progetto inizia lunedì'"
```

### Report Vendite Settimanali

**Analisi Pipeline:**
```
"Ottieni tutte le offerte create questa settimana"
"Mostrami offerte nelle fasi PROPOSTA e NEGOZIAZIONE"
"Filtra offerte per pipeline ID 1 ordinate per importo decrescente"
```

**Revisione Generazione Lead:**
```
"Ottieni lead dall'intervallo date 2025-06-24 a 2025-06-30"
"Elenca lead con fonte WEB degli ultimi 7 giorni"
"Mostrami lead con importo previsto oltre €25000"
```

**Manutenzione Database Contatti:**
```
"Ottieni ultimi 50 contatti creati questo mese"
"Cerca 'gmail.com' in tutti i contatti"
"Elenca aziende create tra 2025-06-01 e 2025-06-30"
```

### Business Intelligence Mensile

**Analisi Ricavi:**
```
"Ottieni tutte le offerte VINTE dal Q2 2025"
"Filtra offerte per budget oltre €100000 negli ultimi 3 mesi"
"Mostrami offerte nella pipeline Vendite Enterprise ordinate per importo"
```

**Segmentazione Mercato:**
```
"Elenca aziende nel settore SOFTWARE con oltre 100 dipendenti"
"Ottieni aziende con fatturato oltre €10000000"
"Mostrami aziende tipo CLIENTE create quest'anno"
```

**Tracciamento Performance:**
```
"Ottieni tutti i lead creati tra 2025-04-01 e 2025-06-30"
"Mostrami tasso conversione da lead a offerte questo trimestre"
"Elenca top 10 offerte di maggior valore chiuse quest'anno"
```

---

## 📚 Guida Rapida API

### Riepilogo Categorie Funzioni

| Categoria | Funzioni | Casi d'Uso Principali |
|-----------|----------|----------------------|
| **Contatti** | 5 funzioni | Gestione relazioni clienti, database contatti |
| **Offerte** | 8 funzioni | Pipeline vendite, tracciamento ricavi, gestione offerte |
| **Lead** | 6 funzioni | Generazione lead, qualificazione, tracciamento conversioni |
| **Aziende** | 6 funzioni | Gestione account, relazioni B2B |
| **Filtri Avanzati** | 5 funzioni | Analisi pipeline, filtri basati su budget |
| **Ricerca e Utilità** | 4 funzioni | Ricerca cross-CRM, scoperta dati |
| **Diagnostica** | 3 funzioni | Salute sistema, risoluzione problemi |

### Parametri Obbligatori vs Opzionali

**Sempre Obbligatori:**
- Contatto: Nome + Cognome
- Offerta: Titolo
- Lead: Titolo  
- Azienda: Nome Azienda
- Aggiornamenti: ID Entità

**Comunemente Opzionali:**
- Limite (default: 20-50 a seconda della funzione)
- Valuta (default: EUR)
- Direzione ordine (default: DESC - più recenti prima)
- Criteri filtro (default: nessun filtro)

### Formati Dati

**Date:** YYYY-MM-DD (es. "2025-07-02")
**Valuta:** EUR, USD, GBP, ecc.
**Telefono:** Qualsiasi formato (+393123456789, (123) 456-7890)
**Email:** Formato standard (utente@dominio.com)

### Valori Stato Comuni

**Stati Lead:**
- NUOVO, IN_PROCESS, PROCESSED, QUALIFICATO, JUNK

**Fasi Offerte:**
- NUOVO, QUALIFICAZIONE, PROPOSTA, NEGOZIAZIONE, VINTA, PERSA

**Tipi Azienda:**
- CLIENTE, FORNITORE, PARTNER, CONCORRENTE

---

## 🎯 Consigli Pro per Massima Efficienza

### 1. **Usa Filtri Specifici**
✅ Bene: "Mostrami offerte dalla pipeline Vendite Enterprise del valore €50K-€200K create questo mese"
❌ Vago: "Mostrami alcune offerte"

### 2. **Combina Operazioni**
✅ Efficiente: "Crea lead per richiesta TechCorp, poi crea task follow-up per domani"
❌ Inefficiente: Richieste separate multiple

### 3. **Sfrutta Intervalli Date**
✅ Preciso: "Ottieni lead dal 2025-06-01 al 2025-06-30"
✅ Flessibile: "Mostrami lead dal mese scorso"

### 4. **Usa Intelligence Pipeline**
✅ Strategico: "Mostrami offerte fase NEGOZIAZIONE oltre €25K in pipeline Enterprise"
✅ Analitico: "Confronta valori offerte tra tutte le pipeline questo trimestre"

### 5. **Ottimizza Query Ricerca**
✅ Mirato: "Cerca 'sara@azienda.com' solo in contatti e lead"
✅ Completo: "Trova tutti i record contenenti 'TechCorp' in tutte le entità"

---

## 🚀 Checklist Primi Passi

### Verifica Setup Iniziale
1. ✅ **Testa Connessione**: "Valida il webhook Bitrix24"
2. ✅ **Controlla Permessi**: "Diagnostica eventuali problemi di permessi"
3. ✅ **Verifica Accesso Dati**: "Mostrami gli ultimi 5 contatti"
4. ✅ **Testa Funzioni Core**: "Ottieni tutte le pipeline offerte"

### Uso Prima Settimana
1. ✅ **Esplora i Tuoi Dati**: "Mostrami ultimi 10 di ciascuno: contatti, offerte, lead, aziende"
2. ✅ **Testa Filtri**: "Ottieni offerte da questo mese ordinate per importo"
3. ✅ **Prova Ricerca**: "Cerca il tuo indirizzo email in tutti i dati CRM"
4. ✅ **Pratica Aggiornamenti**: "Crea un contatto test, poi aggiornalo"

### Uso Avanzato
1. ✅ **Analisi Pipeline**: "Mostrami offerte per pipeline e fase"
2. ✅ **Filtri Budget**: "Trova offerte in diverse fasce budget"
3. ✅ **Report Intervalli Date**: "Ottieni dati performance trimestrali"
4. ✅ **Ricerca Cross-Entità**: "Trova tutti i record relativi a un'azienda specifica"

---

## 📞 Supporto e Risoluzione Problemi

### Comandi Diagnostica Rapida
- **Problemi Connessione**: "Valida il webhook Bitrix24"
- **Problemi Permessi**: "Diagnostica eventuali problemi di permessi"
- **Accesso Dati**: "Controlla impostazioni e configurazione CRM"
- **Performance**: "Testa la funzionalità API lead"

### Soluzioni Comuni
- **Risposte Lente**: Usa limiti più piccoli (5-10 record) per risultati più veloci
- **Nessun Dato Trovato**: Prova intervalli date più ampi o rimuovi filtri
- **Errori Permessi**: Esegui diagnostica per identificare problemi accesso specifici
- **Limiti API**: Rate limiting integrato previene sovraccarico (2 richieste/secondo)

---

## 🎉 Conclusione

Questa guida copre tutte le **37 funzioni disponibili** nella tua integrazione Bitrix24. Ogni funzione è progettata per funzionare con linguaggio naturale - semplicemente dì a Claude cosa vuoi ottenere, e userà automaticamente le chiamate API appropriate.

**Ricorda:**
- Usa linguaggio naturale - non serve conoscenza tecnica
- Inizia con richieste semplici e aumenta la complessità
- Combina operazioni multiple per efficienza
- Usa gli strumenti diagnostici per risoluzione problemi

**Il tuo CRM è ora completamente accessibile tramite AI conversazionale!** 🚀

---

*Ultimo Aggiornamento: 2 luglio 2025 | Funzioni Totali: 37 | Categorie: 8*

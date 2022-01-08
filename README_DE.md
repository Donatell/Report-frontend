# Medizinische Berichtsanwendung (Frontend-Teil)
[English](./README.md)

Siehe die Beschreibung des Backend-Teils hier: [Link](https://github.com/Donatell/report-backend)

## Beschreibung und Anwendungsbereich
Dieses Projekt wurde für eine russische Klinik entwickelt, um den Prozess der Erstellung von Berichten für medizinische Untersuchungen von Unternehmen (B2B) zu automatisieren.

In Russland sind alle Unternehmen verpflichtet, jährlich sowie bei Neueinstellungen eine medizinische Untersuchung durchzuführen. Der Gesetzgeber hat eine Liste von gefährlichen oder schädlichen Faktoren erstellt, in der festgelegt ist, welche nummerierten Faktoren zu welchen Untersuchungen verpflichten. Mit diesem Programm kann die Klinik auf der Grundlage einer Liste von Personen (Name, Geburtsdatum, Nummern der schädlichen Faktoren) verschiedene Arten von medizinischen Berichten erstellen, die vom Föderalen Dienst für Überwachung im Gesundheitswesen zur Erfüllung des Vertrags mit dem Kunden verlangt werden.

## Einfluss und Effizienz
Durch die Anwendung dieses Programms konnten die Berichtsdokumente bei Standardverträgen 6-mal schneller und bei Sonderverträgen 20-mal schneller erstellt werden. Dadurch kann das Unternehmen mehr Aufträge annehmen und die Mitarbeiter effizienter einsetzen.

## Arbeitsablauf
1. Hochladen einer Liste von Patienten als ".xlsx"-Datei 
2. Geben Sie der Datei einen Namen
3. Wählen Sie ein Modul (je nach Kunde gibt es verschiedene Module)
4. Wählen Sie die Spaltenüberschriften, um die Spalten dem Inhalt zuzuordnen
5. Geben Sie das Geschlecht an, wenn es nicht möglich war, es namentlich festzulegen
6. Berichte herunterladen

## Technische Beschreibung des Frontend-Teils
Ich habe mich für **Angular** als Anwendungsdesign-Framework entschieden, um eine Single-Page-App mit **Angular Material UI** Komponenten zu erstellen, um eine hohe Qualität bei gleichzeitig schnellerer Entwicklung zu erreichen. Ein weiterer Vorteil von Angular ist **TypeScript**, da es eine engere Integration mit meinem Code-Editor und Typsicherheit für eine stabilere Entwicklung ermöglicht. Darüber hinaus ermöglichte TypeScript eine effiziente Beschreibung der Datenstrukturen für den Austausch von Anfragen mit dem Server. Da diese App im Internet verfügbar ist, habe ich **Okta** integriert, um digitale Interaktionen zu sichern und den Zugriff auf die App zu begrenzen. Die Anwendung nutzt **SSL**, um übertragene Daten zu sichern.

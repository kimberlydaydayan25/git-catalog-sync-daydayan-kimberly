# Catalog Sync Workflow

## 1. Final `calculateLateFee` Walkthrough

The final `calculateLateFee` function combines four changes made by the contributors during the synchronization process.

### Grace Period - Clone A, Task 1

```javascript
if (daysLate <= 1) {
  return 0;
}

const fee = Math.round(daysLate * ratePerDay);

return Math.min(Math.max(fee, 1), 20);

if (daysLate <= 1) {
  return 0;
}
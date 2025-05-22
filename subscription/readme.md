# Subscription Plans UI

A simple and responsive pricing table web page for subscription plans with toast notifications. Built using HTML, CSS, and JavaScript.

## ✨ Features

* Responsive design
* Three distinct service tiers: Starter, Premium, Enterprise
* Clean and modern UI
* Interactive toast notification system
* Font Awesome icons for better visuals
* Highlighted Premium plan (most popular)

## 📦 Plans Overview

### 🟢 Starter (Free)

* Access to limited features
* Up to 5 tasks per day
* Community support
* Basic analytics

### 🔵 Premium (\$9.99/month)

* Unlimited tasks
* Enhanced analytics dashboard
* Email support
* Priority processing
* No advertisements

### 🟠 Enterprise (\$19.99/month)

* Everything in Premium
* Team collaboration tools
* Dedicated account manager
* API access
* SLA guaranteed uptime
* Custom solutions

## 🧪 Toast Notification System

Notifications are triggered via JavaScript using the `showToast(message, type)` function.

### Types Supported:

* `success`
* `error`
* `invalid`
* `working`

### Example:

```js
showToast("No backend support", "error");
```

## 🧰 Dependencies

* [Font Awesome 6](https://cdnjs.com/libraries/font-awesome)

## ⚠️ Notes

* Currently, the buttons simulate interactions with toast messages. No backend functionality is integrated.
* Ideal for mockups or frontend-only demos.

## 🖼 Preview

<div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; align-items: center;">
  <img src="image.png" style="width: 270px;" />
</div>

---

Built with ❤️ for frontend demonstration purposes.

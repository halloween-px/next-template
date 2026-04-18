# Модалка «Новый сайт» — яркий вариант (архив)

Зафиксировано как ориентир для отката в git.

**Общее:** насыщенные primary/violet, полоса в шапке модалки, градиентные карточки, `ring-2 ring-primary`, сильные тени у кнопки.

**Файлы и отличия:**

- `modal-base-layout.tsx` — верхняя цветная полоса `from-primary/80 via-violet-500/90`, шапка `from-muted/55`, заголовок `text-2xl font-bold`.
- `create-site-project-modal.tsx` — блок с `Sparkles`, градиент `from-primary/12 via-muted to-violet`, blur-орб.
- `project-type-landing-field.tsx` — карточка лендинга `border-2 border-primary/45`, `ring-2 ring-primary/25`, иконка на `bg-primary/20`.
- `default-info-form.tsx` — кнопка `shadow-md shadow-primary/20`.

Текущая рабочая версия в репозитории — **спокойная нейтральная** (меньше акцента, без полосы rainbow).

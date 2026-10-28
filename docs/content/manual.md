# Data Volunteer Network reference manual

```{image} assets/images/brand-emblem-512.png
:alt: The Data Volunteer Network emblem: three figures around a bar chart above Welsh valleys
:class: brand-emblem brand-emblem--float
```

{.brand-kicker}
Cyber Scallywags · Reference manual

The Sphinx edition of the Data Volunteer Network docs: the same pages as the [portal](/), plus the
[Python API](reference/python-api-sphinx.md) generated from docstrings.

{.brand-credit}
![Cyber Scallywags wolf-head mark](assets/images/csw-mark-64.png) In partnership with [Cyber Scallywags](https://cyberscallywags.com)

::::{grid} 1 2 2 3
:gutter: 3

:::{grid-item-card} Get started
:link: getting-started
:link-type: doc

Install the tools, start the stack, find every service.
:::

:::{grid-item-card} Architecture
:link: architecture
:link-type: doc

How every service fits together.
:::

:::{grid-item-card} HTTP API
:link: reference/http-api
:link-type: doc

Endpoints, bodies and `curl`, generated from the code.
:::
::::

```{toctree}
:caption: Guide
:maxdepth: 2

getting-started
architecture
site-manifest
guides/make-it-yours
```

```{toctree}
:caption: Services
:maxdepth: 1

services/api
services/web-ui
services/admin
services/mobile
services/docs
```

```{toctree}
:caption: Development
:maxdepth: 1

development/testing
development/environments
development/ci-cd
```

```{toctree}
:caption: Reference
:maxdepth: 1

reference/http-api
reference/models
reference/configuration
reference/tasks
reference/site-sample
reference/project-metadata
reference/python-api-sphinx
```

```{toctree}
:caption: Community
:maxdepth: 1

about
```

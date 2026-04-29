<h1 align="center">🏝️ Catan</h1>

<p align="center">
  A digital reimplementation of the classic board game <i>Settlers of Catan</i>, built as a school project at HTL Krems.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/-C%23-512bd4?style=flat-square&logo=csharp&logoColor=ffffff" alt="C#" />
  <img src="https://img.shields.io/badge/-Blazor-512bd4?style=flat-square&logo=blazor&logoColor=ffffff" alt="Blazor" />
  <img src="https://img.shields.io/badge/-.NET-512bd4?style=flat-square&logo=dotnet&logoColor=ffffff" alt=".NET" />
  <img src="https://img.shields.io/badge/-Bootstrap-7952b3?style=flat-square&logo=bootstrap&logoColor=ffffff" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/-JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=323330" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Status-WIP-orange?style=flat-square" alt="Status" />
</p>

---

## About

This is a hot-seat implementation of *Settlers of Catan*, where multiple players take turns on the same machine. The project was developed as part of coursework at HTL Krems and explores building a complete game with a clean separation between game logic and UI.

The codebase is split into three parts:

- **`CatanClassLib/`** — Core game logic. Board, tiles, players, resources, dice, building rules. Pure C# with no UI dependencies.
- **`CatanWepGui/`** — Blazor frontend that presents the game. Bootstrap for layout, JavaScript for interactive parts.
- **`Catan/`** — Application entry point and configuration.

## Features

- 🎲 Dice rolls with resource distribution
- 🏘️ Settlements, cities, and roads with placement validation
- 🌾 Resource trading and resource cards
- 🃏 Development card system
- 👥 Hot-seat multiplayer for 3–4 players
- 🏆 Victory point tracking and win condition

## Known Limitations

A few mechanics are still rough or incomplete:

- 🦹 **Robber movement is buggy** — placement and stealing don't always behave correctly
- 🃏 **Development cards can't be used yet** — they can be drawn but playing them is not wired up

## Built With

| Layer | Technology |
| --- | --- |
| Language | C# |
| Framework | Blazor (.NET) |
| Frontend | HTML, CSS, Bootstrap, JavaScript |
| IDE | JetBrains Rider |

## Getting Started

### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (the version specified in `Catan.sln`)
- An IDE that supports .NET solutions (Rider, Visual Studio, or `dotnet` CLI)

### Run locally

```bash
git clone https://github.com/MomoLuck/Catan.git
cd Catan
dotnet run --project CatanWepGui
```

Then open the URL printed in the terminal (usually `https://localhost:5001`).

## Project Status

This is an **active school project**. Core gameplay works, but several mechanics still need polish before it would feel like a finished game. Contributions, suggestions, and bug reports are welcome — see the issues tab.

## Authors

Made by [MomoLuck](https://github.com/MomoLuck) 🐌 and [byHuri](https://github.com/byHuri)

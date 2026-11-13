using System.ComponentModel.DataAnnotations;
using Catan.MainGame.Figures;

namespace Catan.MainGame.MainGameloop;

public static class Players {
    public static List<Player> PlayerList { get; set; } = NewList();

    // --- default farben -> leere farbe hat beim start gecrasht + gleiche farbe = gleicher besitzer
    public static List<Player> NewList() {
        return new List<Player>() {
            new Player("","#d62828"),new Player("","#1d4ed8"),new Player("","#2a9d3a"),new Player("","#f2a900")
        };
    }

    // --- static liste überlebt das spiel -> bei neuem spiel frisch machen
    public static void Reset() {
        PlayerList = NewList();
    }

}

namespace Catan.MainGame;

public static class TileRandomizer
{
    public static ATile[] Tiles { get; set; } = new ATile[19]{
        new Forest(), new Forest(), new Forest(), new Forest(),
        new Badlands(), new Badlands(), new Badlands(),
        new Plains(), new Plains(),new Desert(),new Plains(), new Plains(),
        new Field(), new Field(), new Field(), new Field(),
        new Mountain(), new Mountain(), new Mountain()
    };

    public static string[] Id { get; set; } = new string[18] {"2","3","3","4","4","5","5","6","6","8","8","9","9","10","10","11","11","12" }; 

    // --- fisher yates, desert (index 9) bleibt immer in der mitte
    public static void ShuffleTiles()
    {
        Random rnd = new Random();
        var idx = Enumerable.Range(0, Tiles.Length).Where(i => i != 9).ToList();
        for (int n = idx.Count - 1; n > 0; n--) {
            int k = rnd.Next(n + 1);
            (Tiles[idx[n]], Tiles[idx[k]]) = (Tiles[idx[k]], Tiles[idx[n]]);
        }
    }

    public static void AddRandId() {
        Random rnd = new Random();
        for (int n = Id.Length - 1; n > 0; n--) {
            int k = rnd.Next(n + 1);
            (Id[n], Id[k]) = (Id[k], Id[n]);
        }

        for (int i = 0; i < Id.Length; i++) {
            if (i < 9) {
                Tiles[i].Id = Id[i];
            }
            else {
                Tiles[i+1].Id = Id[i];
            }
        }
    }
    
}
import static spark.Spark.*;

public class Main {
  public static void main(String[] args) {
    get("/hello", (req, res) -> {
      return "Hello World";
    });
  }
}

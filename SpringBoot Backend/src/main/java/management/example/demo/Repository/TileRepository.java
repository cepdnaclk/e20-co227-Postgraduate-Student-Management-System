package management.example.demo.Repository;

import management.example.demo.Model.Tile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TileRepository extends JpaRepository<Tile, Long> {
}

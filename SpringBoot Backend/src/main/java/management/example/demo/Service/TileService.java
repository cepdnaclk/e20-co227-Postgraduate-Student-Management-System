package management.example.demo.Service;

import management.example.demo.Model.Tile;
import management.example.demo.Repository.TileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TileService {

    @Autowired
    private TileRepository tileRepository;

    public Optional<Tile> getTile(Long tileId){
        return tileRepository.findById(tileId);
    }
}

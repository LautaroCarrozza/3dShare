package lab1.dShare.D_Share.MaterialModel;

import lab1.dShare.D_Share.Catalogos.CatalogMaterial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping()
    public List<Material> getAllMaterials(){
        return materialService.getAllMaterials();
    }

    @GetMapping("{id}")
    public Material getMaterial(@PathVariable Long id){
        return materialService.getMaterial(id);
    }

    @PostMapping("/add")
    public void addMaterial(@RequestBody Material material){
        materialService.addMaterial(material);
    }

    @PostMapping("/update")
    public void updateMaterial(@RequestBody Material material){
        materialService.updateMaterial(material);
    }

    @PutMapping("/delete/{id}")
    public void deleteMaterial(@PathVariable Long id){
        materialService.deleteMaterial(id);
    }

    @GetMapping("/byOwnerId/{id}")
    public Set<Material> getMaterialsByOwnerId(@PathVariable long id){
        return materialService.getMaterialsByOwner(id);

    }

    @GetMapping("/byName")
    public Material getMaterialByName(@RequestParam String name){
        return materialService.getMaterialByName(name);
    }

}

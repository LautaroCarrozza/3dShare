package lab1.dShare.D_Share.Catalogos;

import lab1.dShare.D_Share.MaterialModel.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/materials")
public class CMaterialController {
    @Autowired
    private CMaterialService cMaterialService;

    @GetMapping()
    public List<CatalogMaterial> getAllCMaterials(){
        return cMaterialService.getAllMaterials();
    }

    @PostMapping("/add")
    public void addCMaterial(@RequestParam String name){
        CatalogMaterial catalogMaterial = new CatalogMaterial(name);
        cMaterialService.addMaterial(catalogMaterial);
    }

    @PutMapping("/delete/{id}")
    public void deleteCMaterial(@PathVariable Long id){
        cMaterialService.deleteMaterial(id);
    }

    @GetMapping("{id}")
    public CatalogMaterial getCMaterial(@PathVariable Long id){
        return cMaterialService.getMaterial(id);
    }

    @GetMapping("/byName/{name}")
    public CatalogMaterial getCMaterialByName(@PathVariable String name){
        return cMaterialService.getMaterialByName(name);
    }

}

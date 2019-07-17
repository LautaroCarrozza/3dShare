package lab1.dShare.D_Share.Catalogos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CMaterialService {

    @Autowired
    private CMaterialRepository cMaterialRepository;

    public List<CatalogMaterial> getAllMaterials() {
        return StreamSupport.stream(cMaterialRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public void addMaterial(CatalogMaterial material) {
        cMaterialRepository.save(material);
    }

    public void deleteMaterial(@PathVariable Long id){
        cMaterialRepository.deleteById(id);
    }

    public CatalogMaterial getMaterial(Long id) {
        return cMaterialRepository.findById(id).orElse(null);
    }

    public CatalogMaterial getMaterialByName(String name) {
        return cMaterialRepository.findByName(name);
    }
}

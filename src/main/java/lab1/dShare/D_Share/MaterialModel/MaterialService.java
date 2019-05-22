package lab1.dShare.D_Share.MaterialModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    public List<Material> getAllMaterials(){
        return StreamSupport.stream(materialRepository.findAll().spliterator(),false)
                .collect(Collectors.toList());
    }

    public Material getMaterial(Integer id){
        return materialRepository.findById(id).orElse(null);
    }

    public Set<Material> getMaterialsByOwner(Long id){
        return materialRepository.findAllByOwnerId(id);
    }

    public void addMaterial(Material material){
        materialRepository.save(material);
    }

    public void updateMaterial(Material material){
        materialRepository.save(material);
    }

    public void deletePrinter(Integer id){
        materialRepository.deleteById(id);
    }




}

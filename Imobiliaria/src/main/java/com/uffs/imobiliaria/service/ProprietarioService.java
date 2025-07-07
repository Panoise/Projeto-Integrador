package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.model.classes.Endereco;
import com.uffs.imobiliaria.model.classes.Proprietario;
import com.uffs.imobiliaria.repositories.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProprietarioService {

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    //Busca todos os proprietários no banco de dados.

    @Transactional(readOnly = true) // Boa prática para operações de leitura
    public List<Proprietario> findAll() {
        return proprietarioRepository.findAll();
    }

    //Busca o proprietario por ID
    @Transactional(readOnly = true)
    public Optional<Proprietario> findById(Long id) {
        return proprietarioRepository.findById(id);
    }

  //Salva o proprietario no db

    @Transactional
    public Proprietario save(Proprietario proprietario) {

        return proprietarioRepository.save(proprietario);
    }


    //Deleta proprietario por ID

    @Transactional
    public void deleteById(Long id) {

        proprietarioRepository.deleteById(id);
    }

    // Verifica se um proprietário existe pelo ID.

    public boolean existsById(Long id) {
        return proprietarioRepository.existsById(id);
    }

    public Optional<Proprietario> update(Long id, Proprietario proprietarioDetails) {

        Optional<Proprietario> proprietarioOptional = proprietarioRepository.findById(id);

        if (proprietarioOptional.isPresent()) {
            Proprietario proprietarioExistente = proprietarioOptional.get();


            proprietarioExistente.setNome(proprietarioDetails.getNome());
            proprietarioExistente.setCpf(proprietarioDetails.getCpf());
            proprietarioExistente.setEmail(proprietarioDetails.getEmail());
            proprietarioExistente.setRg(proprietarioDetails.getRg());
            proprietarioExistente.setSexo(proprietarioDetails.getSexo());
            proprietarioExistente.setNacionalidade(proprietarioDetails.getNacionalidade());
            proprietarioExistente.setOrgaoExpedidor(proprietarioDetails.getOrgaoExpedidor());
            proprietarioExistente.setDataExpedicaoRg(proprietarioDetails.getDataExpedicaoRg());
            proprietarioExistente.setNaturalidade(proprietarioDetails.getNaturalidade());
            proprietarioExistente.setNomePai(proprietarioDetails.getNomePai());
            proprietarioExistente.setNomeMae(proprietarioDetails.getNomeMae());
            proprietarioExistente.setDataNascimento(proprietarioDetails.getDataNascimento());
            proprietarioExistente.setEstadoCivil(proprietarioDetails.getEstadoCivil());
            proprietarioExistente.setObservacao(proprietarioDetails.getObservacao());
            proprietarioExistente.setTelefone(proprietarioDetails.getTelefone());


            if (proprietarioDetails.getEndereco() != null) {

                Endereco enderecoAtualizado = new Endereco();
                enderecoAtualizado.setRua(proprietarioDetails.getEndereco().getRua());
                enderecoAtualizado.setNumero(proprietarioDetails.getEndereco().getNumero());
                enderecoAtualizado.setCep(proprietarioDetails.getEndereco().getCep());
                enderecoAtualizado.setComplemento(proprietarioDetails.getEndereco().getComplemento());

                proprietarioExistente.setEndereco(enderecoAtualizado);
            }



            return Optional.of(proprietarioRepository.save(proprietarioExistente));
        } else {

            return Optional.empty();
        }
    }

    @Transactional
    public Optional<Proprietario> patch(Long id, Proprietario proprietarioDetails) {
        return proprietarioRepository.findById(id)
                .map(proprietarioExistente -> {

                    if (proprietarioDetails.getNome() != null) {
                        proprietarioExistente.setNome(proprietarioDetails.getNome());
                    }
                    if (proprietarioDetails.getEmail() != null) {
                        proprietarioExistente.setEmail(proprietarioDetails.getEmail());
                    }
                    if (proprietarioDetails.getTelefone() != null) {
                        proprietarioExistente.setTelefone(proprietarioDetails.getTelefone());
                    }
                    if (proprietarioDetails.getSexo() != null) {
                        proprietarioExistente.setSexo(proprietarioDetails.getSexo());
                    }
                    if (proprietarioDetails.getCpf() != null) {
                        proprietarioExistente.setCpf(proprietarioDetails.getCpf());
                    }
                    if (proprietarioDetails.getNacionalidade() != null) {
                        proprietarioExistente.setNacionalidade(proprietarioDetails.getNacionalidade());
                    }
                    if (proprietarioDetails.getRg() != null) {
                        proprietarioExistente.setRg(proprietarioDetails.getRg());
                    }
                    if (proprietarioDetails.getOrgaoExpedidor() != null) {
                        proprietarioExistente.setOrgaoExpedidor(proprietarioDetails.getOrgaoExpedidor());
                    }
                    if (proprietarioDetails.getDataExpedicaoRg() != null) {
                        proprietarioExistente.setDataExpedicaoRg(proprietarioDetails.getDataExpedicaoRg());
                    }
                    if (proprietarioDetails.getNomePai() != null) {
                        proprietarioExistente.setNomePai(proprietarioDetails.getNomePai());
                    }
                    if (proprietarioDetails.getNomeMae() != null) {
                        proprietarioExistente.setNomeMae(proprietarioDetails.getNomeMae());
                    }
                    if (proprietarioDetails.getDataNascimento() != null) {
                        proprietarioExistente.setDataNascimento(proprietarioDetails.getDataNascimento());
                    }
                    if (proprietarioDetails.getEstadoCivil() != null) {
                        proprietarioExistente.setEstadoCivil(proprietarioDetails.getEstadoCivil());
                    }
                    if (proprietarioDetails.getNaturalidade() != null) {
                        proprietarioExistente.setNaturalidade(proprietarioDetails.getNaturalidade());
                    }



                    if (proprietarioDetails.getEndereco() != null) {
                        Endereco enderecoDetails = proprietarioDetails.getEndereco();
                        if (proprietarioExistente.getEndereco() == null) {
                            proprietarioExistente.setEndereco(new Endereco());
                        }
                        if (enderecoDetails.getRua() != null) {
                            proprietarioExistente.getEndereco().setRua(enderecoDetails.getRua());
                        }
                        if (enderecoDetails.getCep() != null) {
                            proprietarioExistente.getEndereco().setCep(enderecoDetails.getCep());
                        }
                        if (enderecoDetails.getNumero() != null) {
                            proprietarioExistente.getEndereco().setNumero(enderecoDetails.getNumero());
                        }
                        if (enderecoDetails.getComplemento() != null) {
                            proprietarioExistente.getEndereco().setComplemento(enderecoDetails.getComplemento());
                        }
                    }

                    return proprietarioRepository.save(proprietarioExistente);
                });
    }




}

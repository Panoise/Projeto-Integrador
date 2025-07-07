package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.dto.ImovelDTO;
import com.uffs.imobiliaria.dto.ProprietarioDTO;
import com.uffs.imobiliaria.model.classes.Endereco;
import com.uffs.imobiliaria.model.classes.Imovel;
import com.uffs.imobiliaria.model.classes.Proprietario;
import com.uffs.imobiliaria.repositories.ImovelRepository;
import com.uffs.imobiliaria.repositories.ProprietarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImovelService {

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private ProprietarioRepository proprietarioRepository;


    private ImovelDTO convertToDto(Imovel imovel) {
        ImovelDTO dto = new ImovelDTO();
        dto.setId(imovel.getId());
        dto.setStatus(imovel.getStatus());
        dto.setTipoFinalidade(imovel.getTipoFinalidade());
        dto.setValorVenda(imovel.getValorVenda());
        dto.setEndereco(imovel.getEndereco());

        if (imovel.getProprietario() != null) {
            ProprietarioDTO proprietarioDto = new ProprietarioDTO();
            proprietarioDto.setId(imovel.getProprietario().getId());
            proprietarioDto.setNome(imovel.getProprietario().getNome());
            proprietarioDto.setCpf(imovel.getProprietario().getCpf());
            dto.setProprietario(proprietarioDto);
        }
        return dto;
    }

    @Transactional(readOnly = true)
    public List<ImovelDTO> findAll() {
        return imovelRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ImovelDTO> findById(Long id) {
        return imovelRepository.findById(id)
                .map(this::convertToDto);
    }

    @Transactional
    public Imovel save(Imovel imovel) {
        if (imovel.getProprietario() != null && imovel.getProprietario().getId() != null) {
            Long proprietarioId = imovel.getProprietario().getId();
            Proprietario proprietario = proprietarioRepository.findById(proprietarioId)
                    .orElseThrow(() -> new EntityNotFoundException("Proprietário com ID " + proprietarioId + " não encontrado."));
            imovel.setProprietario(proprietario);
        } else {
            throw new IllegalArgumentException("É obrigatório fornecer o ID de um proprietário para cadastrar um imóvel.");
        }
        return imovelRepository.save(imovel);
    }

    @Transactional
    public void deleteById(Long id) {
        imovelRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return imovelRepository.existsById(id);
    }

    // CORREÇÃO: O método 'update' foi movido para DENTRO da classe.
    @Transactional
    public Optional<ImovelDTO> update(Long id, Imovel imovelDetails) {
        return imovelRepository.findById(id)
                .map(imovelExistente -> {
                    // Lógica de atualização completa
                    imovelExistente.setStatus(imovelDetails.getStatus());
                    imovelExistente.setTipoFinalidade(imovelDetails.getTipoFinalidade());
                    imovelExistente.setValorVenda(imovelDetails.getValorVenda());
                    imovelExistente.setEndereco(imovelDetails.getEndereco());
                    // Adicione mais campos aqui se necessário

                    Imovel imovelSalvo = imovelRepository.save(imovelExistente);
                    return convertToDto(imovelSalvo);
                });
    }

    @Transactional
    public Optional<ImovelDTO> patch(Long id, Imovel imovelDetails) {
        return imovelRepository.findById(id)
                .map(imovelExistente -> {
                    // Lógica de atualização parcial
                    if (imovelDetails.getStatus() != null) {
                        imovelExistente.setStatus(imovelDetails.getStatus());
                    }
                    if (imovelDetails.getTipoFinalidade() != null) {
                        imovelExistente.setTipoFinalidade(imovelDetails.getTipoFinalidade());
                    }
                    if (imovelDetails.getValorVenda() != null) {
                        imovelExistente.setValorVenda(imovelDetails.getValorVenda());
                    }
                    // Adicione mais campos aqui se necessário

                    Imovel imovelSalvo = imovelRepository.save(imovelExistente);
                    return convertToDto(imovelSalvo);
                });
    }
} // A classe termina aqui, a chave extra foi removida.

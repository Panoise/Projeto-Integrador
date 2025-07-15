package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.dto.*;
import com.uffs.imobiliaria.model.classes.*;
import com.uffs.imobiliaria.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ImovelService {

    @Autowired private ImovelRepository imovelRepository;
    @Autowired private ProprietarioRepository proprietarioRepository;
    @Autowired private BairroRepository bairroRepository;
    @Autowired private CategoriaRepository categoriaRepository;
    @Autowired private CaracteristicaRepository caracteristicaRepository;

    private ImovelDTO convertToDto(Imovel imovel) {
        ImovelDTO dto = new ImovelDTO();
        dto.setId(imovel.getId());
        dto.setStatus(imovel.getStatus());
        dto.setTipoFinalidade(imovel.getTipoFinalidade());
        dto.setQuantidadeQuartos(imovel.getQuantidadeQuartos());
        dto.setQuantidadeBanheiros(imovel.getQuantidadeBanheiros());
        dto.setMetragem(imovel.getMetragem());
        dto.setExibirNoSite(imovel.getExibirNoSite());

        if (imovel.getValorVenda() != null) {
            dto.setValorVenda(String.valueOf(imovel.getValorVenda()));
        }
        dto.setEndereco(imovel.getEndereco());

        if (imovel.getProprietario() != null) {
            ProprietarioDTO proprietarioDto = new ProprietarioDTO();
            proprietarioDto.setId(imovel.getProprietario().getId());
            proprietarioDto.setNome(imovel.getProprietario().getNome());
            dto.setProprietario(proprietarioDto);
        }

        if (imovel.getBairro() != null) {
            BairroDTO bairroDto = new BairroDTO();
            bairroDto.setId(imovel.getBairro().getId());
            bairroDto.setNome(imovel.getBairro().getNome());
            dto.setBairro(bairroDto);
        }

        if (imovel.getCategoria() != null) {
            CategoriaDTO categoriaDto = new CategoriaDTO();
            categoriaDto.setId(imovel.getCategoria().getId());
            categoriaDto.setNome(imovel.getCategoria().getNome());
            dto.setCategoria(categoriaDto);
        }

        if (imovel.getCaracteristicas() != null && !imovel.getCaracteristicas().isEmpty()) {
            Set<CaracteristicaDTO> caracteristicasDto = imovel.getCaracteristicas().stream().map(c -> {
                CaracteristicaDTO caracDto = new CaracteristicaDTO();
                caracDto.setId(c.getId());
                caracDto.setNome(c.getNome());
                return caracDto;
            }).collect(Collectors.toSet());
            dto.setCaracteristicas(caracteristicasDto);
        }

        if (imovel.getImagens() != null && !imovel.getImagens().isEmpty()) {
            List<ImagemDTO> imagemDtos = imovel.getImagens().stream().map(imagem -> {
                ImagemDTO imagemDto = new ImagemDTO();
                imagemDto.setId(imagem.getId());
                imagemDto.setCaminho(imagem.getCaminho());
                return imagemDto;
            }).collect(Collectors.toList());
            dto.setImagens(imagemDtos);
        }

        return dto;
    }

    @Transactional(readOnly = true)
    public List<ImovelDTO> findAll() {
        return imovelRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ImovelDTO> findById(Long id) {
        return imovelRepository.findById(id).map(this::convertToDto);
    }

    @Transactional
    public Imovel save(Imovel imovel) {
        if (imovel.getProprietario() != null && imovel.getProprietario().getId() != null) {
            Proprietario proprietario = proprietarioRepository.findById(imovel.getProprietario().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Proprietário com ID " + imovel.getProprietario().getId() + " não encontrado."));
            imovel.setProprietario(proprietario);
        } else {
            throw new IllegalArgumentException("É obrigatório fornecer o ID de um proprietário para cadastrar um imóvel.");
        }
        // (Lógica de busca por ID para Bairro, Categoria, etc. deve ser adicionada aqui também)
        return imovelRepository.save(imovel);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!imovelRepository.existsById(id)) {
            throw new EntityNotFoundException("Imóvel com ID " + id + " não encontrado.");
        }
        imovelRepository.deleteById(id);
    }

    // --- MÉTODO ADICIONADO ---
    public boolean existsById(Long id) {
        return imovelRepository.existsById(id);
    }

    @Transactional
    public Optional<ImovelDTO> update(Long id, Imovel imovelDetails) {
        return imovelRepository.findById(id)
                .map(imovelExistente -> {
                    imovelExistente.setStatus(imovelDetails.getStatus());
                    imovelExistente.setTipoFinalidade(imovelDetails.getTipoFinalidade());
                    imovelExistente.setValorVenda(imovelDetails.getValorVenda());
                    imovelExistente.setQuantidadeQuartos(imovelDetails.getQuantidadeQuartos());
                    imovelExistente.setQuantidadeBanheiros(imovelDetails.getQuantidadeBanheiros());
                    imovelExistente.setMetragem(imovelDetails.getMetragem());
                    imovelExistente.setExibirNoSite(imovelDetails.getExibirNoSite());

                    if (imovelDetails.getEndereco() != null) {
                        imovelExistente.getEndereco().setRua(imovelDetails.getEndereco().getRua());
                        imovelExistente.getEndereco().setNumero(imovelDetails.getEndereco().getNumero());
                        imovelExistente.getEndereco().setCep(imovelDetails.getEndereco().getCep());
                        imovelExistente.getEndereco().setComplemento(imovelDetails.getEndereco().getComplemento());
                    }
                    if (imovelDetails.getProprietario() != null && imovelDetails.getProprietario().getId() != null) {
                        Proprietario p = proprietarioRepository.findById(imovelDetails.getProprietario().getId()).orElseThrow(() -> new EntityNotFoundException("Proprietário não encontrado"));
                        imovelExistente.setProprietario(p);
                    }
                    if (imovelDetails.getBairro() != null && imovelDetails.getBairro().getId() != null) {
                        Bairro b = bairroRepository.findById(imovelDetails.getBairro().getId()).orElseThrow(() -> new EntityNotFoundException("Bairro não encontrado"));
                        imovelExistente.setBairro(b);
                    }
                    if (imovelDetails.getCategoria() != null && imovelDetails.getCategoria().getId() != null) {
                        Categoria c = categoriaRepository.findById(imovelDetails.getCategoria().getId()).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));
                        imovelExistente.setCategoria(c);
                    }
                    if (imovelDetails.getCaracteristicas() != null) {
                        Set<Long> ids = imovelDetails.getCaracteristicas().stream().map(Caracteristica::getId).collect(Collectors.toSet());
                        Set<Caracteristica> caracteristicas = new HashSet<>(caracteristicaRepository.findAllById(ids));
                        imovelExistente.setCaracteristicas(caracteristicas);
                    }

                    Imovel imovelAtualizado = imovelRepository.save(imovelExistente);
                    return convertToDto(imovelAtualizado);
                });
    }

    // --- MÉTODO PATCH ADICIONADO ---
    @Transactional
    public Optional<ImovelDTO> patch(Long id, Imovel imovelDetails) {
        return imovelRepository.findById(id)
                .map(imovelExistente -> {
                    if (imovelDetails.getStatus() != null) {
                        imovelExistente.setStatus(imovelDetails.getStatus());
                    }
                    if (imovelDetails.getTipoFinalidade() != null) {
                        imovelExistente.setTipoFinalidade(imovelDetails.getTipoFinalidade());
                    }
                    if (imovelDetails.getValorVenda() != null) {
                        imovelExistente.setValorVenda(imovelDetails.getValorVenda());
                    }

                    if (imovelDetails.getExibirNoSite() != null) { // <-- ATUALIZADO AQUI
                        imovelExistente.setExibirNoSite(imovelDetails.getExibirNoSite());
                    }

                    Imovel imovelSalvo = imovelRepository.save(imovelExistente);
                    return convertToDto(imovelSalvo);
                });
    }

    @Transactional(readOnly = true)
    public List<ImovelDTO> findByProprietarioId(Long proprietarioId) {
        return imovelRepository.findByProprietarioId(proprietarioId)
                .stream()
                .map(this::convertToDto) // Reutiliza o seu conversor de DTO
                .collect(Collectors.toList());
    }


}

package com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile

import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.HttpRoutes
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.CreateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.delete
import io.ktor.client.request.get
import io.ktor.client.request.patch
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url

class ClimateProfileApi(private val httpClient: HttpClient) : IClimateProfileApi {
    override suspend fun getAll(): List<ClimateProfile> {
        val response = httpClient.get {
            url(HttpRoutes.CLIMATE_PROFILES)
        }

        return response.body()
    }

    override suspend fun getById(id: String): ClimateProfile {
        val response = httpClient.get {
            url("${HttpRoutes.CLIMATE_PROFILES}/$id")
        }

        return response.body()
    }

    override suspend fun create(dto: CreateClimateProfileDto): ClimateProfile {
        val response = httpClient.post {
            url(HttpRoutes.CLIMATE_PROFILES)
            setBody(dto)
        }

        return response.body()
    }

    override suspend fun update(id: String, dto: UpdateClimateProfileDto): ClimateProfile {
        val response = httpClient.patch {
            url("${HttpRoutes.CLIMATE_PROFILES}/$id")
            setBody(dto)
        }

        return response.body()
    }

    override suspend fun delete(id: String): ClimateProfile {
        val response = httpClient.delete {
            url("${HttpRoutes.CLIMATE_PROFILES}/$id")
        }

        return response.body()
    }
}
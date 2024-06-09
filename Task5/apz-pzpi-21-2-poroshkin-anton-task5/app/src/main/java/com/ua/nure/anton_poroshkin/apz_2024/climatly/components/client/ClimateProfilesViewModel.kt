package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.ClimateProfileApi
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.CreateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import io.ktor.client.HttpClient
import io.ktor.client.call.NoTransformationFoundException
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.defaultRequest
import io.ktor.client.request.headers
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

class ClimateProfilesViewModel : ViewModel() {
    private val client = HttpClient(CIO) {
        defaultRequest {
            headers {
                append("ngrok-skip-browser-warning", "true")
                append("Content-Type", "application/json")
                append(
                    "Authorization",
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZmNlZDhkNy1mZWNlLTRlZGUtODUzNC03OTg1NjJmMjNmOTIiLCJlbWFpbCI6InBvcm9zaGtpbmFudG9uMThAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTcxNzg0ODUzMywiZXhwIjoxNzIwNDQwNTMzfQ.bRmpx3MlqSM1N-OPp7MDuaVx-Uq6JB-TnpArbi0RP-c"
                )
            }
        }

        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
    }

    private val climateProfileApi = ClimateProfileApi(client)

    private var _climateProfiles by mutableStateOf(emptyList<ClimateProfile>())
    private var _isLoading by mutableStateOf(false)
    private var _isCreating by mutableStateOf(false)
    private var _selectedClimateProfile by mutableStateOf<String?>(null)

    val climateProfiles: List<ClimateProfile>
        get() {
            return _climateProfiles
        }

    val isLoading: Boolean
        get() {
            return _isLoading
        }

    var isCreating: Boolean
        get() {
            return _isCreating
        }
        set(value) {
            _isCreating = value
        }

    var selectedClimateProfile: String?
        get() {
            return _selectedClimateProfile
        }
        set(value) {
            _selectedClimateProfile = value
        }

    suspend fun getAll() {
        try {
            _isLoading = true
            val climateProfiles = climateProfileApi.getAll()
            _climateProfiles = climateProfiles
            _isLoading = false
        } catch (e: NoTransformationFoundException) {
            Log.e("FETCH CLIMATE PROFILES", "$e")
        }
    }

    suspend fun addProfile(dto: CreateClimateProfileDto) {
        try {
            _isLoading = true
            climateProfileApi.create(dto)
            _climateProfiles = climateProfileApi.getAll()
            _isLoading = false
            _isCreating = false
        } catch (e: NoTransformationFoundException) {
            Log.e("CREATE CLIMATE PROFILE", "$e")
        }
    }

    suspend fun updateProfile(id: String, dto: UpdateClimateProfileDto) {
        try {
            _isLoading = true
            climateProfileApi.update(id, dto)
            _climateProfiles = climateProfileApi.getAll()
            _isLoading = false
            _isCreating = false
        } catch (e: NoTransformationFoundException) {
            Log.e("UPDATE CLIMATE PROFILE", "$e")
        }
    }

    suspend fun removeProfile(id: String) {
        try {
            _isLoading = true
            climateProfileApi.delete(id)
            _climateProfiles = climateProfileApi.getAll()
            _isLoading = false
            _isCreating = false
        } catch (e: NoTransformationFoundException) {
            Log.e("UPDATE CLIMATE PROFILE", "$e")
        }
    }

    fun handleRefreshClick() {
        viewModelScope.launch {
            getAll()
        }
    }

    fun handleCreateClick(dto: CreateClimateProfileDto) {
        viewModelScope.launch {
            addProfile(dto)
        }
    }

    fun handleUpdateClick(id: String, dto: UpdateClimateProfileDto) {
        viewModelScope.launch {
            updateProfile(id, dto)
        }
    }

    fun handleRemoveClick(id: String) {
        viewModelScope.launch {
            removeProfile(id)
        }
    }
}
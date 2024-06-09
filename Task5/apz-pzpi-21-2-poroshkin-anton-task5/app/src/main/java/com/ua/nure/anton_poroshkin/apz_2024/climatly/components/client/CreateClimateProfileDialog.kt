package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.CreateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile

@Composable
fun CreateClimateProfileDialog(
    onDismiss: () -> Unit,
    onCreate: (CreateClimateProfileDto) -> Unit,
) {
    var name by remember { mutableStateOf("") }
    var temperature by remember { mutableStateOf("") }
    var humidity by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(text = "Create Climate Profile") },

        text = {
            Column {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Name") })
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = temperature,
                    onValueChange = { temperature = it },
                    label = { Text("Temperature (°C)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
                Spacer(modifier = Modifier.height(12.dp))
                OutlinedTextField(
                    value = humidity,
                    onValueChange = { humidity = it },
                    label = { Text("Humidity (%)") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
            }
        },

        confirmButton = {
            TextButton(onClick = {
                val newProfile = CreateClimateProfileDto(
                    name = name,
                    temperature = temperature.toIntOrNull() ?: 0,
                    humidity = humidity.toIntOrNull() ?: 0,
                )
                onCreate(newProfile)
            }) {
                Text("Create")
            }
        },

        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
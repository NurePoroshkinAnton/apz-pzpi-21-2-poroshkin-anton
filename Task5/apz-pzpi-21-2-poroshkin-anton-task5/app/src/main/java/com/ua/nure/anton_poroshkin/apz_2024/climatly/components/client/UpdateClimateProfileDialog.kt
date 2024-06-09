package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.ua.nure.anton_poroshkin.apz_2024.climatly.api.climate_profile.dto.UpdateClimateProfileDto
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile

@Composable
fun UpdateClimateProfileDialog(
    onDismiss: () -> Unit,
    onUpdate: (UpdateClimateProfileDto) -> Unit,
    initialValues: ClimateProfile
) {
    var name by remember { mutableStateOf(initialValues.name) }
    var temperature by remember { mutableStateOf(initialValues.temperature.toString()) }
    var humidity by remember { mutableStateOf(initialValues.humidity.toString()) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(text = "Update climate profile") },

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
                val updateDto = UpdateClimateProfileDto(
                    name = name,
                    temperature = temperature.toIntOrNull() ?: 0,
                    humidity = humidity.toIntOrNull() ?: 0,
                )
                onUpdate(updateDto)
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
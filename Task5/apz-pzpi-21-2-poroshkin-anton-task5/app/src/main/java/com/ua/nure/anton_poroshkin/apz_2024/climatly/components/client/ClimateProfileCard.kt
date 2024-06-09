package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import android.widget.Space
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CardElevation
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.ClimateProfile
import androidx.compose.material3.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.TextButton
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip

@Composable
fun ClimateProfileCard(
    climateProfile: ClimateProfile,
    onUpdateClick: (id: String) -> Unit,
    onRemoveClick: (id: String) -> Unit
) {
    OutlinedCard(
        modifier = Modifier
            .padding(8.dp)
            .width(300.dp)
            .height(300.dp),
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                TextButton(
                    onClick = { onUpdateClick(climateProfile.id) },
                    modifier = Modifier.size(30.dp),
                    contentPadding = PaddingValues(5.dp)
                ) {
                    Icon(Icons.Filled.Edit, null, modifier = Modifier.size(25.dp))
                }
                TextButton(
                    onClick = { onRemoveClick(climateProfile.id) },
                    modifier = Modifier.size(30.dp),
                    contentPadding = PaddingValues(5.dp)
                ) {
                    Icon(Icons.Filled.Delete, null, modifier = Modifier.size(25.dp))
                }
            }
            Text(
                text = climateProfile.name,
                style = MaterialTheme.typography.headlineSmall
            )
            Spacer(modifier = Modifier.size(12.dp))
            Text(text = "Temperature: ${climateProfile.temperature}°C")
            Text(text = "Humidity: ${climateProfile.humidity}%")
            Text(text = "Active: ${if (climateProfile.isActive) "Yes" else "No"}")
            Spacer(modifier = Modifier.weight(1f))
            Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                OutlinedButton(
                    onClick = { /*TODO*/ },
                ) {
                    Text(text = if (climateProfile.isActive) "Deactivate" else "Activate")
                }
            }
        }
    }
}

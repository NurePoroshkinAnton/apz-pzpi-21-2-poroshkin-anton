package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Scaffold
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.compose.material3.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.unit.dp


@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun ClimateProfilesScreen(climateProfilesViewModel: ClimateProfilesViewModel = viewModel()) {
    val climateProfiles = climateProfilesViewModel.climateProfiles
    val isLoading = climateProfilesViewModel.isLoading
    val isCreating = climateProfilesViewModel.isCreating
    val selectedProfileId = climateProfilesViewModel.selectedClimateProfile
    val selectedProfile = climateProfiles.find { profile -> profile.id === selectedProfileId }

    LaunchedEffect(true) {
        climateProfilesViewModel.getAll()
    }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(
                content = { Icon(Icons.Filled.Add, null) },
                onClick = { climateProfilesViewModel.isCreating = true }
            )
        }

    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            contentAlignment = Alignment.Center
        ) {
            if (isLoading) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center
                ) {
                    CircularProgressIndicator(
                        modifier = Modifier.width(64.dp),
                        color = MaterialTheme.colorScheme.secondary,
                        trackColor = MaterialTheme.colorScheme.surfaceVariant,
                    )
                }
            } else {
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "Climate profiles",
                            style = MaterialTheme.typography.headlineMedium
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        TextButton(
                            onClick = { climateProfilesViewModel.handleRefreshClick() },
                            modifier = Modifier.size(30.dp),
                            contentPadding = PaddingValues(5.dp)
                        ) {
                            Icon(Icons.Filled.Refresh, null, modifier = Modifier.size(25.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .horizontalScroll(rememberScrollState())
                    ) {
                        climateProfiles.forEach { profile ->
                            ClimateProfileCard(
                                climateProfile = profile,
                                onUpdateClick = { id ->
                                    climateProfilesViewModel.selectedClimateProfile = id
                                },
                                onRemoveClick = { id ->
                                    climateProfilesViewModel.handleRemoveClick(id)
                                })
                        }
                    }
                }
            }
        }

        if (isCreating) {
            CreateClimateProfileDialog(
                onDismiss = { climateProfilesViewModel.isCreating = false },
                onCreate = { profile ->
                    climateProfilesViewModel.handleCreateClick(profile)
                })
        }

        if (selectedProfileId != null && selectedProfile != null) {
            UpdateClimateProfileDialog(
                onDismiss = { climateProfilesViewModel.selectedClimateProfile = null },
                initialValues = selectedProfile,
                onUpdate = { profile ->
                    climateProfilesViewModel.handleUpdateClick(selectedProfileId, profile)
                })
        }
    }
}
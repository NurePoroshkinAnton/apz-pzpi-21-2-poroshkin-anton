package com.ua.nure.anton_poroshkin.apz_2024.climatly

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import com.ua.nure.anton_poroshkin.apz_2024.climatly.components.auth.AuthScreen
import com.ua.nure.anton_poroshkin.apz_2024.climatly.components.client.ClimateProfilesScreen
import com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth.AuthStateProvider
import com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth.LocalAuthStateViewModel
import com.ua.nure.anton_poroshkin.apz_2024.climatly.ui.theme.ClimatlyTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ClimatlyTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AuthStateProvider {
                        App()
                    }
                }
            }
        }
    }
}

@Composable
fun App() {
    val authStateViewModel = LocalAuthStateViewModel.current
    val authState = authStateViewModel.authState.collectAsState()

    if (authState.value.isAuthenticated) {
        ClimateProfilesScreen()
    } else {
        AuthScreen()
    }
}


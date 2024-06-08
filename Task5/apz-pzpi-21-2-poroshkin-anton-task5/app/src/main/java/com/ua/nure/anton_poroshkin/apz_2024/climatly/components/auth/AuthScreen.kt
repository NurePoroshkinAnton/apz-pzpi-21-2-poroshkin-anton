package com.ua.nure.anton_poroshkin.apz_2024.climatly.components.auth

import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.auth0.android.jwt.JWT
import com.ua.nure.anton_poroshkin.apz_2024.climatly.context.auth.LocalAuthStateViewModel
import com.ua.nure.anton_poroshkin.apz_2024.climatly.models.Client

@Composable
fun AuthScreen(authViewModel: AuthViewModel = viewModel()) {
    val context = LocalContext.current
    val authStateViewModel = LocalAuthStateViewModel.current

    LaunchedEffect(authViewModel.accessToken) {
        val accessToken = authViewModel.accessToken

        if (accessToken !== null) {
            Log.i("AUTH", "access token: $accessToken")
            val payload = JWT(authViewModel.accessToken!!)

            val client = Client(
                id = payload.getClaim("id").asString() ?: "",
                name = payload.getClaim("name").asString() ?: "",
                email = payload.getClaim("email").asString() ?: "",
                roomId = payload.getClaim("roomId").asString(),
            )

            authStateViewModel.setAuthState(
                isAuthenticated = true,
                accessToken = accessToken,
                client = client
            )
        } else {
            authStateViewModel.setAuthState(false, null, null)
        }
    }


    Box(
        modifier = Modifier
            .fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "Welcome to Climatly!",
                style = MaterialTheme.typography.headlineLarge,
                modifier = Modifier.padding(bottom = 16.dp)
            )
            Button(onClick = {
                authViewModel.handleLoginClick(context)
            }, enabled = !authViewModel.isLoading) {
                Text(text = "Sign in with Google")
            }
        }
    }
}